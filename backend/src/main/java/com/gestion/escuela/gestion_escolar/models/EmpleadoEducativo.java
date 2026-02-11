package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoEnLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoInactivoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.LicenciaSuperpuestaException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(
		name = "empleados_educativos",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"cuil", "escuela_id"}),
				@UniqueConstraint(columnNames = {"email", "escuela_id"})
		}
)
@Getter
@Setter
public class EmpleadoEducativo {

	@OneToMany(mappedBy = "empleadoEducativo")
	private final Set<Asignacion> asignaciones;

	@OneToMany(mappedBy = "empleadoEducativo", cascade = CascadeType.ALL, orphanRemoval = true)
	private final Set<Licencia> licencias;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long id;
	@ManyToOne(optional = false)

	@JoinColumn(name = "escuela_id")
	private Escuela escuela;

	@Column(nullable = false)
	private String cuil;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private String apellido;

	private String domicilio;
	private String telefono;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private boolean activo = true;

	@Column(nullable = false)
	private LocalDate fechaDeNacimiento;

	@Column(nullable = false)
	private LocalDate fechaDeIngreso;

	protected EmpleadoEducativo() {
		this.asignaciones = new HashSet<>();
		this.licencias = new HashSet<>();
	}

	public EmpleadoEducativo(
			Escuela escuela,
			String cuil,
			String nombre,
			String apellido,
			String domicilio,
			String telefono,
			LocalDate fechaDeNacimiento,
			LocalDate fechaDeIngreso,
			String email
	) {

		validarCamposObligatorios(escuela, cuil, nombre, apellido, fechaDeNacimiento, fechaDeIngreso, email);
		validarFechas(fechaDeNacimiento, fechaDeIngreso);

		this.escuela = escuela;
		this.cuil = cuil;
		this.nombre = nombre;
		this.apellido = apellido;
		this.domicilio = domicilio;
		this.telefono = telefono;
		this.email = email;
		this.fechaDeNacimiento = fechaDeNacimiento;
		this.fechaDeIngreso = fechaDeIngreso;
		this.asignaciones = new HashSet<>();
		this.licencias = new HashSet<>();
	}

	public Licencia crearLicencia(TipoLicencia tipo, Periodo periodo, String descripcion) {

		validarCreacionLicencia(tipo, periodo);
		Licencia licencia = new Licencia(tipo, periodo, descripcion);
		afectarDesignacionesPorLicencia(licencia, periodo);
		licencias.add(licencia);
		licencia.asignarEmpleadoEducativo(this);

		return licencia;
	}

	public void darDeBajaDefinitiva(
			CausaBaja causaBaja,
			LocalDate fechaBaja
	) {
		validarBajaDefinitiva(causaBaja, fechaBaja);

		this.activo = false;

		asignacionesVigentesEn(fechaBaja).forEach(a -> a.finalizarPorBajaDefinitiva(causaBaja, fechaBaja));

	}

	public void agregarAsignacion(Asignacion asignacion) {
		if (asignacion == null) {
			throw new CampoObligatorioException("asignación");
		}

		if (!this.equals(asignacion.getEmpleadoEducativo())) {
			asignacion.asignarEmpleado(this);
		}

		asignaciones.add(asignacion);
	}

	public Set<Designacion> designacionesAfectadasPor(Licencia licencia) {
		if (licencia == null) {
			return Set.of();
		}

		return asignaciones.stream()
				.filter(a -> a.afectadaPor(licencia))
				.map(Asignacion::getDesignacion)
				.collect(Collectors.toUnmodifiableSet());
	}

	private void validarCamposObligatorios(Escuela escuela,
										   String cuil,
										   String nombre,
										   String apellido,
										   LocalDate fechaDeNacimiento,
										   LocalDate fechaDeIngreso,
										   String email) {

		if (escuela == null)
			throw new CampoObligatorioException("escuela");
		if (cuil == null || cuil.isBlank())
			throw new CampoObligatorioException("cuil");
		if (nombre == null || nombre.isBlank())
			throw new CampoObligatorioException("nombre");
		if (apellido == null || apellido.isBlank())
			throw new CampoObligatorioException("apellido");
		if (email == null || email.isBlank())
			throw new CampoObligatorioException("email");
		if (fechaDeNacimiento == null)
			throw new CampoObligatorioException("fecha de nacimiento");
		if (fechaDeIngreso == null)
			throw new CampoObligatorioException("fecha de ingreso");
	}

	private void validarFechas(LocalDate fechaDeNacimiento, LocalDate fechaDeIngreso) {
		if (fechaDeIngreso.isBefore(fechaDeNacimiento))
			throw new RangoFechasInvalidoException("La fecha de ingreso no puede ser anterior a la fecha de nacimiento");

	}

	private void validarCreacionLicencia(TipoLicencia tipo, Periodo periodo) {
		if (tipo == null) {
			throw new CampoObligatorioException("tipo de licencia");
		}
		if (periodo == null) {
			throw new CampoObligatorioException("período");
		}
		if (tieneLicenciaSuperpuesta(periodo)) {
			throw new LicenciaSuperpuestaException();
		}
	}

	private void afectarDesignacionesPorLicencia(Licencia licencia, Periodo periodo) {
		asignacionesVigentesEn(periodo.getFechaDesde()).stream()
				.map(Asignacion::getDesignacion)
				.forEach(licencia::afectarDesignacion);
	}

	private List<Asignacion> asignacionesVigentesEn(LocalDate fecha) {
		if (fecha == null) {
			return List.of();
		}

		return asignaciones.stream()
				.filter(a -> a.estaActiva(fecha))        // existe en el sistema
				.filter(a -> a.estaVigenteEn(fecha))   // aplica a la fecha
				.toList();
	}

	private void validarBajaDefinitiva(CausaBaja causaBaja, LocalDate fechaBaja) {
		if (causaBaja == null)
			throw new CampoObligatorioException("causa de baja");
		if (fechaBaja == null)
			throw new CampoObligatorioException("fecha de baja");
	}

	private boolean tieneLicenciaSuperpuesta(Periodo periodo) {
		if (periodo == null) {
			return false;
		}

		return licencias.stream().anyMatch(l -> l.seSuperponeCon(periodo));
	}

	public void validarPuedeTomarPosesionEn(LocalDate fecha) {
		if (fecha == null) {
			throw new CampoObligatorioException("fecha de toma de posesión");
		}

		if (!this.activo) {
			throw new EmpleadoInactivoException(id);
		}

		if (tieneLicenciaEn(fecha)) {
			throw new EmpleadoEnLicenciaException(id, fecha);
		}
	}

	private boolean tieneLicenciaEn(LocalDate fecha) {
		return licencias.stream().anyMatch(l -> l.estaVigenteEn(fecha));
	}

	public Set<DiaDeSemana> diasLaborablesEn(LocalDate fecha) {
		return asignaciones.stream()
				.filter(a -> a.estaActiva(fecha))
				.map(Asignacion::getDesignacion)
				.flatMap(d -> d.getFranjasHorarias().stream())
				.map(FranjaHoraria::getDia)
				.collect(Collectors.toSet());
	}

	public Set<DiaDeSemana> diasQueTrabajaEnEscuela(Long escuelaId) {

		if (!this.escuela.getId().equals(escuelaId)) {
			throw new IllegalStateException(
					"El empleado no pertenece a la escuela indicada"
			);
		}

		return asignaciones.stream()
				.flatMap(a -> a.getDesignacion().getFranjasHorarias().stream())
				.map(FranjaHoraria::getDia)
				.collect(Collectors.toSet());
	}
	
	public List<LocalDate> calcularDiasLaborables(Licencia licencia) {

		Periodo periodo = licencia.getPeriodo();
		List<LocalDate> fechas = new ArrayList<>();

		for (LocalDate fecha = periodo.getFechaDesde();
			 !fecha.isAfter(periodo.getFechaHasta());
			 fecha = fecha.plusDays(1)) {

			DayOfWeek dayOfWeek = fecha.getDayOfWeek();

			if (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY) {
				continue; // no es día laboral en el dominio
			}

			Set<DiaDeSemana> diasTrabaja = diasLaborablesEn(fecha);

			DiaDeSemana dia = DiaDeSemana.from(fecha);

			if (diasTrabaja.contains(dia)) {
				fechas.add(fecha);
			}
		}

		return fechas;
	}


}
