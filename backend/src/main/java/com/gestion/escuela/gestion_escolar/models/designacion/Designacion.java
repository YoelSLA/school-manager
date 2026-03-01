package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaCubiertaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria.RangoHorarioInvalidoException;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;

import static com.gestion.escuela.gestion_escolar.models.PoliticaDeRenovacion.validarReglaCicloLectivo;

@Entity
@Table(
		name = "designacion",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"escuela_id", "cupof"})
		}
)
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
public abstract class Designacion {

	@OneToMany(
			mappedBy = "designacion",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private final List<Asignacion> asignaciones = new ArrayList<>();

	@ElementCollection
	@CollectionTable(
			name = "franja_horaria",
			joinColumns = @JoinColumn(name = "designacion_id")
	)
	private final Set<FranjaHoraria> franjasHorarias = new HashSet<>();

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Integer cupof;

	@ManyToOne(optional = false)
	@JoinColumn(name = "escuela_id", nullable = false)
	private Escuela escuela;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private RolEducativo rolEducativo;

	protected Designacion() {
	}

	protected Designacion(Escuela escuela, Integer cupof, RolEducativo rolEducativo) {
		Validaciones.noNulo(escuela, "escuela");
		Validaciones.noNulo(cupof, "cupof");
		Validaciones.noNulo(rolEducativo, "rol educativo");

		this.escuela = escuela;
		this.cupof = cupof;
		this.rolEducativo = rolEducativo;
	}

	public void agregarFranjaHoraria(FranjaHoraria nueva) {
		Validaciones.noNulo(nueva, "franja horaria");

		boolean haySolapamiento = franjasHorarias.stream().anyMatch(f -> f.seSuperponeCon(nueva));

		if (haySolapamiento) {
			throw new RangoHorarioInvalidoException(nueva.getHoraDesde(), nueva.getHoraHasta());
		}

		franjasHorarias.add(nueva);
	}

	public void asignarEscuela(Escuela escuela) {
		Validaciones.noNulo(escuela, "escuela");
		this.escuela = escuela;
	}

	public AsignacionTitular cubrirConTitular(
			EmpleadoEducativo empleado,
			LocalDate fechaDesde
	) {
		PoliticaDeCobertura.validarCubrirConTitular(this, empleado, fechaDesde);
		AsignacionTitular titular = new AsignacionTitular(empleado, this, fechaDesde);
		agregarAsignacion(titular);
		return titular;
	}

	public AsignacionProvisional cubrirConProvisionalAutomatico(
			EmpleadoEducativo empleado,
			LocalDate fechaInicio
	) {
		LocalDate fechaHasta = ultimoDiaHabilDeFebreroSiguiente(fechaInicio);
		Periodo periodo = new Periodo(fechaInicio, fechaHasta);

		PoliticaDeCobertura.validarCubrirConProvisionalAutomatico(this, empleado, fechaInicio, periodo);


		AsignacionProvisional asignacion = new AsignacionProvisional(empleado, this, periodo);
		agregarAsignacion(asignacion);
		return asignacion;
	}

	public AsignacionProvisional cubrirConProvisionalManual(
			EmpleadoEducativo empleado,
			Periodo periodo
	) {

		PoliticaDeCobertura.validarCubrirConProvisionalManual(this, empleado, periodo);

		AsignacionProvisional asignacion = new AsignacionProvisional(empleado, this, periodo);
		agregarAsignacion(asignacion);
		return asignacion;
	}

	public AsignacionSuplente cubrirConSuplente(
			Licencia licencia,
			EmpleadoEducativo suplente,
			LocalDate fechaInicio
	) {

		PoliticaDeCobertura.validarCubrirConSuplente(this, licencia, suplente, fechaInicio);

		LocalDate fechaFin = licencia.getPeriodo().getFechaHasta();
		Periodo periodo = new Periodo(fechaInicio, fechaFin);

		AsignacionSuplente asignacionSuplente = new AsignacionSuplente(suplente, this, periodo);

		agregarAsignacion(asignacionSuplente);

		return asignacionSuplente;
	}

	public AsignacionProvisional renovarProvisionalAutomatica(
			AsignacionProvisional anterior
	) {

		Validaciones.noNulo(anterior, "asignación anterior");

		int anio = anterior.getPeriodo().getFechaHasta().getYear();

		LocalDate desde = LocalDate.of(anio, 3, 1);
		LocalDate hasta = ultimoDiaHabilDeFebreroSiguiente(desde);

		Periodo nuevoPeriodo = new Periodo(desde, hasta);

		validarReglaCicloLectivo(nuevoPeriodo);

		AsignacionProvisional nueva = new AsignacionProvisional(anterior.getEmpleadoEducativo(), this, nuevoPeriodo);

		agregarAsignacion(nueva);

		return nueva;
	}

	public AsignacionProvisional renovarProvisionalDesdeMarzo(
			AsignacionProvisional asignacionAnterior,
			LocalDate fechaHasta
	) {

		PoliticaDeRenovacion.validarRenovarProvisionalDesdeMarzo(asignacionAnterior, fechaHasta);

		LocalDate fechaFinAnterior = asignacionAnterior.getPeriodo().getFechaHasta();

		int anioInicio = fechaFinAnterior.getMonthValue() >= 3
				? fechaFinAnterior.getYear() + 1
				: fechaFinAnterior.getYear();

		LocalDate desde = LocalDate.of(anioInicio, 3, 1);

		Periodo nuevoPeriodo = new Periodo(desde, fechaHasta);

		PoliticaDeRenovacion.validarReglaCicloLectivo(nuevoPeriodo);

		AsignacionProvisional nueva =
				new AsignacionProvisional(asignacionAnterior.getEmpleadoEducativo(), this, nuevoPeriodo);

		agregarAsignacion(nueva);

		return nueva;
	}

	public AsignacionProvisional renovarProvisionalManual(
			AsignacionProvisional anterior,
			Periodo nuevoPeriodo
	) {
		PoliticaDeRenovacion.validarRenovarProvisionalManual(anterior, nuevoPeriodo);

		AsignacionProvisional nueva =
				new AsignacionProvisional(anterior.getEmpleadoEducativo(), this, nuevoPeriodo);

		agregarAsignacion(nueva);

		return nueva;
	}

	public Optional<Asignacion> asignacionQueEjerceEn(LocalDate fecha) {
		if (fecha == null)
			return Optional.empty();

		return asignaciones.stream()
				.filter(a -> a.estaActivaEn(fecha))
				.findFirst();
	}

	@Transient
	public EstadoDesignacion getEstadoEn(LocalDate fecha) {
		return EstadoDesignacion.desde(asignacionQueEjerceEn(fecha).isPresent());
	}

	public void notificarBajaDefinitivaDe(
			Asignacion asignacion,
			LocalDate fechaBaja
	) {

		Validaciones.noNulo(asignacion, "asignación");
		Validaciones.noNulo(fechaBaja, "fecha baja");

		if (!asignacion.puedeGenerarVacanteDefinitiva()) {
			return;
		}

		buscarSuplenteQueEjerceEn(fechaBaja)
				.ifPresent(suplente -> {
					LocalDate inicioProvisional = fechaBaja.plusDays(1);
					suplente.convertirseEnProvisional(inicioProvisional);
				});
	}

	public boolean trabajaElDia(LocalDate fecha) {

		if (fecha == null)
			return false;

		DiaDeSemana diaEnum = DiaDeSemana.from(fecha);

		return franjasHorarias.stream().anyMatch(f -> f.getDia().equals(diaEnum));
	}

	private Optional<AsignacionSuplente> buscarSuplenteQueEjerceEn(LocalDate fecha) {
		return asignaciones.stream()
				.filter(AsignacionSuplente.class::isInstance)
				.map(AsignacionSuplente.class::cast)
				.filter(a -> a.estaActivaEn(fecha))
				.findFirst();
	}

	private void agregarAsignacion(Asignacion asignacion) {
		Validaciones.noNulo(asignacion, "asignación");

		validarNoSuperposicion(asignacion);

		asignaciones.add(asignacion);
		asignacion.getEmpleadoEducativo().agregarAsignacion(asignacion);
	}

	private void validarNoSuperposicion(Asignacion nueva) {

		LocalDate fechaInicio = nueva.getPeriodo().getFechaDesde();

		boolean hayAsignacionQueEjerce = asignaciones.stream().anyMatch(a -> a.estaActivaEn(fechaInicio));

		if (hayAsignacionQueEjerce) {
			throw new DesignacionYaCubiertaException(this);
		}
	}

	public boolean tieneTitularActivo(LocalDate fecha) {
		return asignaciones.stream().anyMatch(a -> a.esTitular() && a.ejerceEn(fecha));
	}

	@Override
	public String toString() {
		return getClass().getSimpleName() + "{ " +
				"id = " + id +
				", cupof = " + cupof +
				", escuela  = " + (escuela != null ? escuela : null) +
				", rolEducativo = " + rolEducativo +
				", asignaciones = " + asignaciones.size() +
				" }";
	}

	private LocalDate ultimoDiaHabilDeFebreroSiguiente(LocalDate fechaInicio) {

		Validaciones.noNulo(fechaInicio, "fecha inicio");

		int anioSiguiente = fechaInicio.getYear() + 1;

		LocalDate febrero = LocalDate.of(anioSiguiente, 2, 1);
		LocalDate ultimoDia = febrero.withDayOfMonth(febrero.lengthOfMonth());

		while (esFinDeSemana(ultimoDia)) {
			ultimoDia = ultimoDia.minusDays(1);
		}

		return ultimoDia;
	}

	private boolean esFinDeSemana(LocalDate fecha) {
		DayOfWeek day = fecha.getDayOfWeek();
		return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
	}

	public boolean tieneVacantePorLicenciaEn(LocalDate fecha) {
		return asignaciones.stream()
				.anyMatch(a -> a.estaEnLicenciaEn(fecha));
	}

	public boolean estaCubiertaEn(LocalDate fecha) {
		return asignaciones.stream().anyMatch(a -> a.ejerceEn(fecha));
	}


}