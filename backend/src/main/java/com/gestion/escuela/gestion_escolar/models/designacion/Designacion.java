package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.domainServices.ServicioCobertura;
import com.gestion.escuela.gestion_escolar.models.domainServices.ServicioRenovacion;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaCubiertaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria.RangoHorarioInvalidoException;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Stream;

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

	@ElementCollection
	@CollectionTable(
			name = "franja_horaria",
			joinColumns = @JoinColumn(name = "designacion_id")
	)
	private Set<FranjaHoraria> franjasHorarias;

	@OneToMany(
			mappedBy = "designacion",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private List<Asignacion> asignaciones;

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
		this.asignaciones = new ArrayList<>();
		this.franjasHorarias = new HashSet<>();
	}

	protected Designacion(Escuela escuela, Integer cupof, RolEducativo rolEducativo) {
		Validaciones.noNulo(escuela, "escuela");
		Validaciones.noNulo(cupof, "cupof");
		Validaciones.noNulo(rolEducativo, "rol educativo");

		this.escuela = escuela;
		this.cupof = cupof;
		this.rolEducativo = rolEducativo;
		this.asignaciones = new ArrayList<>();
		this.franjasHorarias = new HashSet<>();
	}

	public void agregarFranjaHoraria(FranjaHoraria nueva) {
		Validaciones.noNulo(nueva, "franja horaria");

		boolean haySolapamiento = franjasHorarias.stream().
				anyMatch(f -> f.seSuperponeCon(nueva));

		if (haySolapamiento) {
			throw new RangoHorarioInvalidoException(nueva.getHoraDesde(), nueva.getHoraHasta());
		}

		franjasHorarias.add(nueva);
	}

	public void asignarEscuela(Escuela escuela) {
		Validaciones.noNulo(escuela, "escuela");
		this.escuela = escuela;
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

		getSuplenciaActivaEn(fechaBaja)
				.ifPresent(suplente -> {
					LocalDate inicioProvisional = fechaBaja.plusDays(1);
					suplente.convertirseEnProvisional(inicioProvisional, suplente.getSecuencia());
				});
	}

	public void setFranjasHorarias(Set<FranjaHoraria> nuevasFranjas) {
		Validaciones.noNulo(nuevasFranjas, "franjas horarias");
		this.franjasHorarias.clear();
		nuevasFranjas.forEach(this::agregarFranjaHoraria);
	}

	public void eliminarAsignacion(Asignacion asignacion) {
		asignaciones.remove(asignacion);
		asignacion.getEmpleadoEducativo().eliminarAsignacion(asignacion);
	}

	public AsignacionTitular cubrirConTitular(
			EmpleadoEducativo empleado,
			LocalDate fechaDesde,
			Integer secuencia
	) {
		return ServicioCobertura.cubrirConTitular(this,empleado,fechaDesde,secuencia);
	}
	public AsignacionProvisional cubrirConProvisionalAutomatico(
			EmpleadoEducativo empleado,
			LocalDate fechaInicio,
			Integer secuencia
	) {
		return ServicioCobertura.cubrirConProvisionalAutomatico(
				this,
				empleado,
				fechaInicio,
				secuencia
		);
	}
	public AsignacionProvisional cubrirConProvisionalManual(
			EmpleadoEducativo empleado,
			Periodo periodo,
			Integer secuencia
	) {
		return ServicioCobertura.cubrirConProvisionalManual(this,empleado,periodo,secuencia);
	}
	public AsignacionSuplente cubrirConSuplente(
			Licencia licencia,
			EmpleadoEducativo suplente,
			LocalDate fechaInicio,
			Integer secuencia
	) {
		return ServicioCobertura.cubrirConSuplente(this, licencia, suplente, fechaInicio, secuencia);
	}
	public AsignacionProvisional renovarProvisionalAutomatica(
			AsignacionProvisional anterior,
			Integer secuencia
	) {

		return ServicioRenovacion
				.renovarProvisionalAutomatica(
						this,
						anterior,
						secuencia
				);
	}

	public AsignacionProvisional renovarProvisionalDesdeMarzo(
			AsignacionProvisional asignacionAnterior,
			LocalDate fechaHasta,
			Integer secuencia
	) {

		return ServicioRenovacion
				.renovarProvisionalDesdeMarzo(
						this,
						asignacionAnterior,
						fechaHasta,
						secuencia
				);
	}

	public AsignacionProvisional renovarProvisionalManual(
			AsignacionProvisional anterior,
			Periodo nuevoPeriodo,
			Integer secuencia
	) {

		return ServicioRenovacion
				.renovarProvisionalManual(
						this,
						anterior,
						nuevoPeriodo,
						secuencia
				);
	}

	public Optional<Asignacion> asignacionQueEjerceEn(LocalDate fecha) {
		if (fecha == null)
			return Optional.empty();

		return asignacionesActivasEn(fecha).findFirst();
	}

	public Optional<EmpleadoEducativo> getEmpleadoActivoEn(LocalDate fecha) {
		return asignacionQueEjerceEn(fecha).map(Asignacion::getEmpleadoEducativo);
	}

	public boolean tieneTitularActivo(LocalDate fecha) {
		return asignacionesEjercientesEn(fecha).anyMatch(Asignacion::esTitular);
	}

	public boolean trabajaElDia(LocalDate fecha) {

		if (fecha == null)
			return false;

		DiaDeSemana diaEnum = DiaDeSemana.from(fecha);

		return franjasHorarias.stream().anyMatch(f -> f.getDia().equals(diaEnum));
	}

	public boolean tieneVacantePorLicenciaEn(LocalDate fecha) {
		return asignacionesActivasEn(fecha).anyMatch(a -> a.estaEnLicenciaEn(fecha));
	}

	public boolean estaCubiertaEn(LocalDate fecha) {
		return asignacionesEjercientesEn(fecha).findAny().isPresent();
	}

	public boolean tieneAsignacionQueSeSuperponeCon(Periodo periodo) {
		return this.asignaciones.stream()
				.anyMatch(a -> a.seSuperponeCon(periodo));
	}

	@Transient
	public EstadoDesignacion getEstadoEn(LocalDate fecha) {
		return EstadoDesignacion.desde(asignacionQueEjerceEn(fecha).isPresent());
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

	public Optional<AsignacionSuplente> getSuplenciaActivaEn(LocalDate fecha) {
		return asignacionesActivasEn(fecha)
				.filter(AsignacionSuplente.class::isInstance)
				.map(AsignacionSuplente.class::cast)
				.findFirst();
	}

	public <T extends Asignacion> T registrar(T asignacion) {

		agregarAsignacion(asignacion);

		return asignacion;
	}

	protected void actualizarCupof(Integer cupof) {
		Validaciones.noNulo(cupof, "cupof");
		this.cupof = cupof;
	}

	protected void actualizarRolEducativo(RolEducativo rolEducativo) {
		Validaciones.noNulo(rolEducativo, "rol educativo");
		this.rolEducativo = rolEducativo;
	}

	private void agregarAsignacion(Asignacion asignacion) {

		Validaciones.noNulo(asignacion, "asignación");

		LocalDate fechaInicio = asignacion.getPeriodo().getFechaDesde();

		boolean hayAsignacionQueEjerce =
				asignacionesEjercientesEn(fechaInicio).findAny().isPresent();

		if (hayAsignacionQueEjerce) {
			throw new DesignacionYaCubiertaException(this);
		}

		if (!asignaciones.contains(asignacion)) {
			asignaciones.add(asignacion);
		}

		asignacion.setDesignacion(this);
	}

	private Stream<Asignacion>
	asignacionesActivasEn(LocalDate fecha) {
		return asignaciones.stream().filter(a -> a.estaActivaEn(fecha));
	}

	private Stream<Asignacion>
	asignacionesEjercientesEn(LocalDate fecha) {

		return asignaciones.stream().filter(a -> a.estaEjerciendoEn(fecha));
	}

}