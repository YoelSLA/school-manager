package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionNoActivaDelEmpleadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionNoPerteneceAlEmpleadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionSuperpuestaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoInactivoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.LicenciaSuperpuestaException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(
		name = "empleadoEducativo",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"cuil", "escuela_id"}),
				@UniqueConstraint(columnNames = {"email", "escuela_id"})
		}
)
@Getter
@Setter
public class EmpleadoEducativo {

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

	private LocalDate fechaDeIngreso;

	@OneToMany(mappedBy = "empleadoEducativo")
	private Set<Asignacion> asignaciones;

	@OneToMany(mappedBy = "empleadoEducativo", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Licencia> licencias;


	protected EmpleadoEducativo() {
		this.asignaciones = new HashSet<>();
		this.licencias = new HashSet<>();
	}

	private EmpleadoEducativo(Builder builder) {

		validarCrearOActualizar(
				builder.escuela,
				builder.cuil,
				builder.nombre,
				builder.apellido,
				builder.email,
				builder.fechaDeNacimiento,
				builder.fechaDeIngreso
		);

		this.escuela = builder.escuela;
		this.cuil = builder.cuil;
		this.nombre = builder.nombre;
		this.apellido = builder.apellido;
		this.domicilio = builder.domicilio;
		this.telefono = builder.telefono;
		this.email = builder.email;
		this.fechaDeNacimiento = builder.fechaDeNacimiento;
		this.fechaDeIngreso = builder.fechaDeIngreso;

		this.asignaciones = new HashSet<>();
		this.licencias = new HashSet<>();
	}

	public static Builder builder() {
		return new Builder();
	}
	// =========================================================
	// LICENCIAS
	// =========================================================
	public Licencia crearLicencia(
			TipoLicencia tipo,
			Periodo periodo,
			String descripcion,
			Set<Asignacion> asignaciones
	) {
		validarCrearOActualizarLicencia(tipo, periodo, asignaciones);

		Licencia licencia = Licencia.builder()
				.empleadoEducativo(this)
				.tipoLicencia(tipo)
				.periodo(periodo)
				.descripcion(descripcion)
				.agregarAsignaciones(asignaciones)
				.build();

		licencias.add(licencia);

		return licencia;
	}

	public void eliminarLicencia(Licencia licencia) {
		licencias.remove(licencia);
	}

	public Optional<Licencia> licenciaActivaEn(LocalDate fecha) {
		if (fecha == null) {
			return Optional.empty();
		}
		return licencias.stream().filter(l -> l.estaVigenteEn(fecha)).findFirst();
	}

	public boolean estaEnLicenciaPara(
			Asignacion asignacion,
			LocalDate fecha
	) {
		return licencias.stream()
				.anyMatch(l -> l.afectaA(asignacion, fecha));
	}
	// =========================================================
	// ASIGNACIONES
	// =========================================================
	public void agregarAsignacion(Asignacion asignacion) {

		// Valida que la asignación no sea null
		Validaciones.noNulo(asignacion, "asignación");

		this.validarAsignacionNoSuperpuesta(asignacion);

		// Agrega la asignación al empleadoEducativoBasico
		asignaciones.add(asignacion);

		// Mantiene sincronizada la relación
		// Asignacion -> EmpleadoEducativo
		asignacion.setEmpleadoEducativo(this);
	}

	public void eliminarAsignacion(Asignacion asignacion) {
		this.asignaciones.remove(asignacion);
	}

	public Set<Asignacion> asignacionesActivasEn(LocalDate fecha) {
		Validaciones.noNulo(fecha, "fecha");

		return asignaciones.stream()
				.filter(a -> a.estaActivaEn(fecha))
				.collect(Collectors.toUnmodifiableSet());
	}

	public Set<Asignacion> asignacionesEnLicenciaEn(LocalDate fecha) {

		if (fecha == null) {
			return Set.of();
		}

		return asignaciones.stream()
				.filter(a -> estaEnLicenciaPara(a, fecha))
				.collect(Collectors.toUnmodifiableSet());
	}

	private Set<Asignacion> asignacionesAfectadasPorBaja(LocalDate fecha) {
		Set<Asignacion> resultado = new HashSet<>();
		resultado.addAll(asignacionesActivasEn(fecha));
		resultado.addAll(asignacionesEnLicenciaEn(fecha));
		return resultado;
	}

	private void validarAsignacionNoSuperpuesta(Asignacion asignacion) {

		boolean superpuesta = asignaciones.stream()
				.anyMatch(a ->
						a != asignacion
								&& a.getDesignacion().equals(asignacion.getDesignacion())
								&& a.seSuperponeCon(asignacion)
				);

		if (superpuesta) {
			throw new AsignacionSuperpuestaException();
		}
	}

	// =========================================================
	// DESIGNACIONES
	// =========================================================
	public Set<Designacion> designacionesActivasEn(LocalDate fecha) {

		if (fecha == null) {
			return Set.of();
		}

		return asignaciones.stream()
				.filter(a -> a.estaActivaEn(fecha))
				.map(Asignacion::getDesignacion)
				.collect(Collectors.toUnmodifiableSet());
	}
	// =========================================================
	// ASISTENCIA / JORNADA LABORAL
	// =========================================================
	public Set<DiaDeSemana> diasLaborablesEn(LocalDate fecha) {
		return asignaciones.stream()
				.filter(a -> a.estaActivaEn(fecha))
				.map(Asignacion::getDesignacion)
				.flatMap(d -> d.getFranjasHorarias().stream())
				.map(FranjaHoraria::getDia)
				.collect(Collectors.toSet());
	}

	public List<LocalDate> diasQueDebeAsistir(YearMonth yearMonth) {

		LocalDate inicio = yearMonth.atDay(1);
		LocalDate fin = yearMonth.atEndOfMonth();

		return inicio.datesUntil(fin.plusDays(1))
				.filter(this::debeAsistirEn)
				.toList();
	}

	public EstadoAsistenciaDia estadoAsistenciaEn(
			LocalDate fecha,
			Map<LocalDate, Asistencia> manualesPorFecha
	) {
		Asistencia manual = manualesPorFecha.get(fecha);
		if (manual != null) {
			return EstadoAsistenciaDia.manual(manual);
		}
		return EstadoAsistenciaDia.presente(fecha);
	}

	private boolean debeAsistirEn(LocalDate fecha) {
		if (fecha == null) {
			return false;
		}
		return asignaciones.stream()
				.map(Asignacion::getDesignacion)
				.anyMatch(designacion -> designacion.trabajaElDia(fecha));
	}

	public List<RolEducativo> rolesActivosEn(LocalDate fecha) {

		return asignaciones.stream()
				.filter(a -> a.estaActivaEn(fecha))
				.map(Asignacion::getRolEducativo)
				.distinct()
				.toList();
	}
	// =========================================================
	// ESTADO DEL EMPLEADO EDUCATIVO
	// =========================================================
	public void darDeBajaDefinitiva(CausaBaja causaBaja, LocalDate fechaBaja) {
		Validaciones.noNulo(causaBaja, "causa bajaAsignacion");
		Validaciones.noNulo(fechaBaja, "fecha de bajaAsignacion");
		this.activo = false;
		asignacionesAfectadasPorBaja(fechaBaja).
				forEach(a -> a.finalizarPorBajaDefinitiva(causaBaja, fechaBaja));
	}

	public void actualizar(
			String cuil,
			String nombre,
			String apellido,
			String domicilio,
			String telefono,
			LocalDate fechaDeNacimiento,
			LocalDate fechaDeIngreso,
			String email
	) {

		validarCrearOActualizar(this.escuela, cuil, nombre, apellido, email, fechaDeNacimiento, fechaDeIngreso);

		this.cuil = cuil;
		this.nombre = nombre;
		this.apellido = apellido;
		this.domicilio = domicilio;
		this.telefono = telefono;
		this.fechaDeNacimiento = fechaDeNacimiento;
		this.fechaDeIngreso = fechaDeIngreso;
		this.email = email;
	}
	// =========================================================
	// VALIDACIONES
	// =========================================================
	private void validarCrearOActualizar(
			Escuela escuela,
			String cuil,
			String nombre,
			String apellido,
			String email,
			LocalDate fechaDeNacimiento,
			LocalDate fechaDeIngreso
	) {

		Validaciones.noNulo(escuela, "escuela");
		Validaciones.cuilValido(cuil);
		Validaciones.noBlank(nombre, "nombre");
		Validaciones.noBlank(apellido, "apellido");
		Validaciones.emailValido(email);
		Validaciones.noNulo(fechaDeNacimiento, "fecha de nacimiento");

		if (fechaDeIngreso != null && fechaDeIngreso.isBefore(fechaDeNacimiento)) {
			throw new RangoFechasInvalidoException(fechaDeIngreso, fechaDeNacimiento);
		}
	}

	private void validarCrearOActualizarLicencia(
			TipoLicencia tipo,
			Periodo periodo,
			Set<Asignacion> asignaciones
	) {
		Validaciones.noNulo(tipo, "tipo de licencia");
		Validaciones.noNulo(periodo, "periodo");
		Validaciones.noVacio(asignaciones, "asignaciones");

		if (!isActivo()) {
			throw new EmpleadoInactivoException(this);
		}

		if (tieneLicenciaSuperpuesta(periodo)) {
			throw new LicenciaSuperpuestaException();
		}

		if (!pertenecenAlEmpleado(asignaciones)) {
			throw new AsignacionNoPerteneceAlEmpleadoException();
		}

		if (!estanActivasEn(asignaciones, periodo.getFechaDesde())) {
			throw new AsignacionNoActivaDelEmpleadoException();
		}
	}

	/**
	 * Indica si el empleadoEducativoBasico posee al menos una licencia que se superpone con el
	 * período indicado.
	 *
	 * <p>Se considera que una licencia se superpone cuando comparte al menos un
	 * día con el período consultado.</p>
	 *
	 * @param periodo período a evaluar.
	 * @return {@code true} si el empleadoEducativoBasico tiene una licencia superpuesta al
	 * período indicado; {@code false} en caso contrario.
	 */
	public boolean tieneLicenciaSuperpuestaEn(Periodo periodo) {
		return licencias.stream()
				.anyMatch(l -> l.seSuperponeCon(periodo));
	}

	/**
	 * Indica si el empleadoEducativoBasico posee alguna licencia vigente en la fecha indicada.
	 *
	 * @param fecha fecha a evaluar.
	 * @return {@code true} si existe una licencia que incluya la fecha dada;
	 * {@code false} en caso contrario.
	 */
	public boolean tieneLicenciaEn(LocalDate fecha) {
		return licencias.stream()
				.anyMatch(l -> l.contiene(fecha));
	}

	private Set<Asignacion> asignacionesActivasDe(
			Set<Designacion> designaciones,
			LocalDate fecha
	) {
		return asignaciones.stream()
				.filter(a -> a.estaActivaEn(fecha))
				.filter(a -> designaciones.contains(a.getDesignacion()))
				.collect(Collectors.toSet());
	}

	private boolean tieneLicenciaSuperpuesta(Periodo periodo) {
		return licencias.stream().anyMatch(l -> l.seSuperponeCon(periodo));
	}

	private boolean pertenecenAlEmpleado(Set<Asignacion> asignaciones) {
		return this.asignaciones.containsAll(asignaciones);
	}

	private boolean estanActivasEn(Set<Asignacion> asignaciones, LocalDate fecha) {
		return asignacionesActivasEn(fecha).containsAll(asignaciones);
	}



	// =========================================================
	// BUILDER
	// =========================================================
	public static class Builder {

		private Escuela escuela;
		private String cuil;
		private String nombre;
		private String apellido;
		private String domicilio;
		private String telefono;
		private String email;
		private LocalDate fechaDeNacimiento;
		private LocalDate fechaDeIngreso;

		public Builder escuela(Escuela escuela) {

			this.escuela = escuela;
			return this;
		}

		public Builder cuil(String cuil) {
			this.cuil = cuil;
			return this;
		}

		public Builder nombre(String nombre) {
			this.nombre = nombre;
			return this;
		}

		public Builder apellido(String apellido) {
			this.apellido = apellido;
			return this;
		}

		public Builder domicilio(String domicilio) {
			this.domicilio = domicilio;
			return this;
		}

		public Builder telefono(String telefono) {
			this.telefono = telefono;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public Builder fechaDeNacimiento(LocalDate fechaDeNacimiento) {
			this.fechaDeNacimiento = fechaDeNacimiento;
			return this;
		}

		public Builder fechaDeIngreso(LocalDate fechaDeIngreso) {
			this.fechaDeIngreso = fechaDeIngreso;
			return this;
		}

		public EmpleadoEducativo build() {
			return new EmpleadoEducativo(this);
		}
	}

}
