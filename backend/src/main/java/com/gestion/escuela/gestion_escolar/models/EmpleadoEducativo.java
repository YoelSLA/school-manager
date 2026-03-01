package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoInactivoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionNoActivaDelEmpleadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.LicenciaSuperpuestaException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(
		name = "empleado_educativo",
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

		validarDatosBasicos(escuela, cuil, nombre, apellido, email, fechaDeNacimiento);
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

	public Licencia crearLicencia(
			TipoLicencia tipo,
			Periodo periodo,
			String descripcion,
			Set<Designacion> designaciones
	) {

		validarCrearLicencia(tipo, periodo);
		validarDesignacionesPropiasYActivas(designaciones, periodo);

		Licencia licencia = new Licencia(
				this,
				tipo,
				periodo,
				descripcion,
				designaciones
		);

		licencias.add(licencia);

		return licencia;
	}

	public void darDeBajaDefinitiva(
			CausaBaja causaBaja,
			LocalDate fechaBaja
	) {

		Validaciones.noNulo(causaBaja, "causa baja");
		Validaciones.noNulo(fechaBaja, "fecha de baja");

		this.activo = false;

		asignacionesAfectadasPorBaja(fechaBaja).forEach(a -> a.finalizarPorBajaDefinitiva(causaBaja, fechaBaja));
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

		validarDatosBasicos(this.escuela, cuil, nombre, apellido, email, fechaDeNacimiento);
		validarFechas(fechaDeNacimiento, fechaDeIngreso);

		this.cuil = cuil;
		this.nombre = nombre;
		this.apellido = apellido;
		this.domicilio = domicilio;
		this.telefono = telefono;
		this.fechaDeNacimiento = fechaDeNacimiento;
		this.fechaDeIngreso = fechaDeIngreso;
		this.email = email;
	}

	public Set<DiaDeSemana> diasLaborablesEn(LocalDate fecha) {
		return asignaciones.stream()
				.filter(a -> a.estaActivaEn(fecha))
				.map(Asignacion::getDesignacion)
				.flatMap(d -> d.getFranjasHorarias().stream())
				.map(FranjaHoraria::getDia)
				.collect(Collectors.toSet());
	}

	public Optional<Licencia> licenciaActivaEn(LocalDate fecha) {

		if (fecha == null) {
			return Optional.empty();
		}

		return licencias.stream().filter(l -> l.estaVigenteEn(fecha)).findFirst();
	}

	public Set<Designacion> designacionesActivasEn(LocalDate fecha) {

		if (fecha == null) {
			return Set.of();
		}

		return asignaciones.stream()
				.filter(a -> a.estaActivaEn(fecha))
				.map(Asignacion::getDesignacion)
				.collect(Collectors.toUnmodifiableSet());
	}

	public Set<Asignacion> asignacionesActivasEn(LocalDate fecha) {

		if (fecha == null) {
			return Set.of();
		}

		return asignaciones.stream()
				.filter(a -> a.estaActivaEn(fecha))
				.collect(Collectors.toUnmodifiableSet());
	}

	public Set<Asignacion> asignacionesEnLicenciaEn(LocalDate fecha) {

		if (fecha == null) {
			return Set.of();
		}

		return asignaciones.stream()
				.filter(a -> estaEnLicenciaPara(a.getDesignacion(), fecha))
				.collect(Collectors.toUnmodifiableSet());
	}

	public boolean estaEnLicenciaPara(Designacion designacion, LocalDate fecha) {
		return licencias.stream()
				.anyMatch(l -> l.afectaA(designacion, fecha));
	}

	public boolean debeAsistirEn(LocalDate fecha) {

		if (fecha == null) {
			return false;
		}

		DiaDeSemana dia;
		try {
			dia = DiaDeSemana.from(fecha);
		} catch (
				Exception e) {
			return false;
		}

		Set<DiaDeSemana> diasBloqueados = diasQueNoTrabajaPorLicencia(fecha);

		for (Asignacion a : asignaciones) {

			boolean licencia = a.estaEnLicenciaEn(fecha);

			if (!licencia) {
				continue;
			}

			boolean trabajaEseDia = a.getDesignacion().trabajaElDia(fecha);
			boolean bloqueado = diasBloqueados.contains(dia);

			if (trabajaEseDia && bloqueado) {
				return true;
			}
		}

		return false;
	}

	public Set<DiaDeSemana> diasQueNoTrabajaPorLicencia(LocalDate fecha) {

		return licenciaActivaEn(fecha)
				.map(l ->
						l.getDesignaciones()
								.stream()
								.flatMap(d -> d.getFranjasHorarias().stream())
								.map(FranjaHoraria::getDia)
								.collect(Collectors.toSet())
				)
				.orElseGet(Set::of);
	}

	private Set<Asignacion> asignacionesAfectadasPorBaja(LocalDate fecha) {
		Set<Asignacion> resultado = new HashSet<>();
		resultado.addAll(asignacionesActivasEn(fecha));
		resultado.addAll(asignacionesEnLicenciaEn(fecha));
		return resultado;
	}

	private void validarDatosBasicos(
			Escuela escuela,
			String cuil,
			String nombre,
			String apellido,
			String email,
			LocalDate fechaDeNacimiento
	) {

		Validaciones.noNulo(escuela, "escuela");
		Validaciones.cuilValido(cuil);
		Validaciones.noBlank(nombre, "nombre");
		Validaciones.noBlank(apellido, "apellido");
		Validaciones.emailValido(email);
		Validaciones.noNulo(fechaDeNacimiento, "fecha de nacimiento");
	}

	private void validarFechas(LocalDate fechaDeNacimiento, LocalDate fechaDeIngreso) {
		if (fechaDeIngreso != null && fechaDeIngreso.isBefore(fechaDeNacimiento)) {
			throw new RangoFechasInvalidoException(fechaDeIngreso, fechaDeNacimiento);
		}
	}

	private void validarCrearLicencia(TipoLicencia tipo, Periodo periodo) {

		Validaciones.noNulo(tipo, "tipo de licencia");
		Validaciones.noNulo(periodo, "periodo");

		if (!this.activo) {
			throw new EmpleadoInactivoException(this);
		}

		if (licencias.stream().anyMatch(l -> l.getPeriodo().seSuperponeCon(periodo))) {
			throw new LicenciaSuperpuestaException();
		}
	}

	private void validarDesignacionesPropiasYActivas(
			Set<Designacion> designaciones,
			Periodo periodo
	) {

		Validaciones.noVacio(designaciones, "designacion.");

		Set<Designacion> activas = designacionesActivasEn(periodo.getFechaDesde());

		if (!activas.containsAll(designaciones)) {
			throw new DesignacionNoActivaDelEmpleadoException(designaciones);
		}
	}

	public boolean tieneAlgunCargoQueSeSuperponeCon(Periodo periodo) {
		return this.asignaciones.stream().anyMatch(a -> a.seSuperponeCon(periodo));
	}
}
