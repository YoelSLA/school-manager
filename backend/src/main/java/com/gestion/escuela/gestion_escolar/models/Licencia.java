package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.FechaRenovacionInvalidaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.periodo.PeriodoAbiertoException;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

import static com.gestion.escuela.gestion_escolar.models.Periodo.cerrado;

@Entity
@Table(name = "licencia")
@Getter
public class Licencia {

	// =========================================================
	// Atributos / Persistencia
	// =========================================================

	@ManyToMany
	@JoinTable(
			name = "licencia_asignacion",
			joinColumns = @JoinColumn(name = "licencia_id"),
			inverseJoinColumns = @JoinColumn(name = "asignacion_id")
	)
	private final Set<Asignacion> asignaciones;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "empleado_id")
	private EmpleadoEducativo empleadoEducativo;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TipoLicencia tipoLicencia;

	@Column(length = 500)
	private String descripcion;

	@OneToOne
	@JoinColumn(name = "licencia_anterior_id")
	private Licencia licenciaAnterior;

	@OneToOne(mappedBy = "licenciaAnterior")
	private Licencia licenciaSiguiente;

	@Embedded
	private Periodo periodo;

	// =========================================================
	// Construcción / Builder
	// =========================================================

	protected Licencia() {
		this.asignaciones = new HashSet<>(); // JPA
	}

	private Licencia(Builder builder) {

		Validaciones.noNulo(builder.empleadoEducativo, "empleadoEducativoBasico educativo");
		Validaciones.noNulo(builder.tipoLicencia, "tipo licencia");
		Validaciones.noNulo(builder.periodo, "periodo");
		Validaciones.noVacio(builder.asignaciones, "asignaciones");

		this.empleadoEducativo = builder.empleadoEducativo;
		this.tipoLicencia = builder.tipoLicencia;
		this.periodo = builder.periodo;
		this.descripcion = builder.descripcion;
		this.asignaciones = new HashSet<>(builder.asignaciones);
	}

	// =========================================================
	// Gestión de Asignaciones
	// =========================================================

	public static Builder builder() {
		return new Builder();
	}

	public void agregarAsignacion(Asignacion asignacion) {
		Validaciones.noNulo(asignacion, "asignacion");

		this.asignaciones.add(asignacion);
	}

	public void agregarAsignaciones(Set<Asignacion> asignaciones) {
		Validaciones.noVacio(asignaciones, "asignaciones");

		this.asignaciones.addAll(asignaciones);
	}

	public void eliminarAsignacion(Asignacion asignacion) {
		Validaciones.noNulo(asignacion, "asignacion");

		this.asignaciones.remove(asignacion);
	}

	public void eliminarAsignaciones() {
		this.asignaciones.clear();
	}

	public Set<Asignacion> getAsignaciones() {
		return Collections.unmodifiableSet(asignaciones);
	}

	// =========================================================
	// Vigencia y Estado
	// =========================================================
	public boolean estaVigenteEn(LocalDate fecha) {
		return periodo.estaVigenteEn(fecha);
	}

	public Integer dias() {
		return Math.toIntExact(periodo.dias());
	}

	@Transient
	public EstadoLicencia getEstadoEn(LocalDate fecha) {

		long inicio = System.currentTimeMillis();

		boolean vigente = periodo.estaVigenteEn(fecha);

		System.out.println(
				"Licencia " + id +
						" periodo.estaVigenteEn() -> " +
						(System.currentTimeMillis() - inicio) + " ms"
		);

		if (!vigente) {
			return EstadoLicencia.NO_VIGENTE;
		}

		inicio = System.currentTimeMillis();

		boolean cubierta = estaCubiertaEn(fecha);

		System.out.println(
				"Licencia " + id +
						" estaCubiertaEn() -> " +
						(System.currentTimeMillis() - inicio) + " ms"
		);

		return cubierta
				? EstadoLicencia.CUBIERTA
				: EstadoLicencia.DESCUBIERTA;
	}
	public boolean contiene(LocalDate fecha) {
		return periodo.contiene(fecha);
	}

	public long diasRestantes(LocalDate fecha) {

		Validaciones.noNulo(fecha, "fecha");

		if (!estaVigenteEn(fecha)) {
			return 0;
		}

		return ChronoUnit.DAYS.between(fecha, periodo.getFechaHasta()) + 1;
	}

	// =========================================================
	// Relaciones con Designaciones
	// =========================================================
	public boolean afectaA(Asignacion asignacion, LocalDate fecha) {
		Validaciones.noNulo(asignacion, "asignacion");
		Validaciones.noNulo(fecha, "fecha");

		return periodo.estaVigenteEn(fecha)
				&& asignaciones.contains(asignacion);
	}

	public Optional<AsignacionSuplente> suplenciaDe(
			Asignacion asignacion
	) {
		Validaciones.noNulo(asignacion, "asignacion");

		return asignacion.getDesignacion().suplenciaDe(this);
	}

	// =========================================================
	// Renovaciones y Cadena
	// =========================================================
	public Licencia renovar(TipoLicencia tipoLicencia, LocalDate nuevoHasta, String descripcion) {

		Validaciones.noNulo(nuevoHasta, "nueva hasta");

		if (!nuevoHasta.isAfter(periodo.getFechaHasta())) {
			throw new FechaRenovacionInvalidaException(
					"La fecha fin de renovación debe ser posterior a la actual"
			);
		}

		LocalDate nuevoDesde = periodo.getFechaHasta().plusDays(1);

		Licencia licenciaRenovada = empleadoEducativo.crearLicencia(
				tipoLicencia,
				cerrado(nuevoDesde, nuevoHasta),
				descripcion,
				new HashSet<>(this.getAsignaciones())
		);

		this.licenciaSiguiente = licenciaRenovada;
		licenciaRenovada.licenciaAnterior = this;

		return licenciaRenovada;
	}

	public List<Licencia> cadenaCompleta() {

		Licencia raiz = licenciaRaiz();

		List<Licencia> cadena = new ArrayList<>();
		Licencia actual = raiz;

		while (actual != null) {
			cadena.add(actual);
			actual = actual.licenciaSiguiente;
		}

		return cadena;
	}

	// =========================================================
	// Superposición
	// =========================================================
	public boolean seSuperponeCon(Licencia licencia) {
		Validaciones.noNulo(licencia, "licencia");
		return this.seSuperponeCon(licencia.getPeriodo());
	}

	public boolean seSuperponeCon(Periodo periodo) {
		Validaciones.noNulo(periodo, "periodo");
		return this.periodo.seSuperponeCon(periodo);
	}

	// =========================================================
	// Infraestructura / Utilitarios
	// =========================================================
	@Override
	public String toString() {
		return "Licencia{" +
				"id=" + id +
				", empleadoId=" +
				(empleadoEducativo != null
						? empleadoEducativo.getId()
						: null) +
				", codigoLicencia=" + tipoLicencia +
				", descripcion='" + descripcion + '\'' +
				", periodo=" + periodo +
				", licenciaAnteriorId=" +
				(licenciaAnterior != null
						? licenciaAnterior.getId()
						: null) +
				", licenciaSiguienteId=" +
				(licenciaSiguiente != null
						? licenciaSiguiente.getId()
						: null) +
				", designacionesIds=" +
				asignaciones.stream()
						.map(Asignacion::getId)
						.toList() +
				'}';
	}

	public Optional<Asignacion> getAsignacionAfectada(
			Designacion designacion
	) {

		Validaciones.noNulo(designacion, "designacion");

		return asignaciones.stream()
				.filter(a -> a.getDesignacion().equals(designacion))
				.findFirst();
	}

	private boolean estaCubiertaEn(LocalDate fecha) {

		if (!estaVigenteEn(fecha)) {
			return false;
		}

		Set<Designacion> designaciones = designacionesAfectadas();

		return designaciones.stream()
				.allMatch(d ->
						d.getEstadoEn(fecha)
								== EstadoDesignacion.CUBIERTA);
	}

	private Set<Designacion> designacionesAfectadas() {
		return asignaciones.stream()
				.map(Asignacion::getDesignacion)
				.collect(Collectors.toSet());
	}

	private Licencia licenciaRaiz() {

		Licencia actual = this;

		while (actual.licenciaAnterior != null) {
			actual = actual.licenciaAnterior;
		}

		return actual;
	}

	// =========================================================
	// Construcción / Builder
	// =========================================================
	public static class Builder {

		private final Set<Asignacion> asignaciones = new HashSet<>();
		private EmpleadoEducativo empleadoEducativo;
		private TipoLicencia tipoLicencia;
		private Periodo periodo;
		private String descripcion;

		public Builder empleadoEducativo(EmpleadoEducativo empleadoEducativo) {
			this.empleadoEducativo = empleadoEducativo;
			return this;
		}

		public Builder tipoLicencia(TipoLicencia tipoLicencia) {
			this.tipoLicencia = tipoLicencia;
			return this;
		}

		public Builder periodo(Periodo periodo) {

			if (periodo == null) {
				throw new CampoObligatorioException("El período es obligatorio.");
			}

			if (periodo.esAbierto()) {
				throw new PeriodoAbiertoException("La licencia no puede tener un período abierto.");
			}

			this.periodo = periodo;

			return this;
		}

		public Builder descripcion(String descripcion) {
			this.descripcion = descripcion;
			return this;
		}

		public Builder agregarAsignacion(Asignacion asignacion) {
			this.asignaciones.add(asignacion);
			return this;
		}

		public Builder agregarAsignaciones(Set<Asignacion> asignaciones) {
			this.asignaciones.addAll(asignaciones);
			return this;
		}

		public Licencia build() {
			return new Licencia(this);
		}
	}
}
