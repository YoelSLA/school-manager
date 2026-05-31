package com.gestion.escuela.gestion_escolar.models;

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
			name = "licencia_designacion",
			joinColumns = @JoinColumn(name = "licencia_id"),
			inverseJoinColumns = @JoinColumn(name = "designacion_id")
	)
	private final Set<Designacion> designaciones;

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
		this.designaciones = new HashSet<>(); // JPA
	}

	private Licencia(Builder builder) {

		Validaciones.noNulo(builder.empleadoEducativo, "empleado educativo");
		Validaciones.noNulo(builder.tipoLicencia, "tipo licencia");
		Validaciones.noNulo(builder.periodo, "periodo");
		Validaciones.noVacio(builder.designaciones, "designación");

		this.empleadoEducativo = builder.empleadoEducativo;
		this.tipoLicencia = builder.tipoLicencia;
		this.periodo = builder.periodo;
		this.descripcion = builder.descripcion;
		this.designaciones = new HashSet<>(builder.designaciones);
	}

	public static Builder builder() {
		return new Builder();
	}

	// =========================================================
	// Gestión de Designaciones
	// =========================================================

	public void agregarDesignacion(Designacion designacion) {
		Validaciones.noNulo(designacion, "designacion");

		this.designaciones.add(designacion);
	}

	public void agregarDesignaciones(Set<Designacion> designaciones) {
		Validaciones.noVacio(designaciones, "designacion");

		this.designaciones.addAll(designaciones);
	}

	public void eliminarDesignacion(Designacion designacion) {
		Validaciones.noNulo(designacion, "designacion");

		this.designaciones.remove(designacion);
	}

	public void eliminarDesignaciones() {
		this.designaciones.clear();
	}

	public Set<Designacion> getDesignaciones() {
		return Collections.unmodifiableSet(designaciones);
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

		if (!periodo.estaVigenteEn(fecha)) {
			return EstadoLicencia.NO_VIGENTE;
		}

		return estaCubiertaEn(fecha) ? EstadoLicencia.CUBIERTA : EstadoLicencia.DESCUBIERTA;
	}

	private boolean estaCubiertaEn(LocalDate fecha) {

		if (!estaVigenteEn(fecha)) {
			return false;
		}

		if (designaciones.isEmpty()) {
			return false;
		}

		return designaciones.stream()
				.allMatch(d ->
						d.getEstadoEn(fecha) == EstadoDesignacion.CUBIERTA
				);
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
	public boolean afectaA(
			Designacion designacion,
			LocalDate fecha
	) {
		return periodo.estaVigenteEn(fecha) && designaciones.contains(designacion);
	}

	public Optional<AsignacionSuplente> suplenciaDe(
			Designacion designacion
	) {

		Validaciones.noNulo(designacion, "designacion");

		return designacion.getAsignaciones().stream()
				.filter(AsignacionSuplente.class::isInstance)
				.map(AsignacionSuplente.class::cast)
				.filter(a -> this.equals(a.getLicencia()))
				.findFirst();
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
				this.designaciones
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

	private Licencia licenciaRaiz() {

		Licencia actual = this;

		while (actual.licenciaAnterior != null) {
			actual = actual.licenciaAnterior;
		}

		return actual;
	}
	// =========================================================
	// Superposición
	// =========================================================
	public boolean seSuperponeCon(Licencia otraLicencia) {
		Validaciones.noNulo(otraLicencia, "licencia");

		return this.seSuperponeCon(otraLicencia.getPeriodo());
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
				", tipoLicencia=" + tipoLicencia +
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
				designaciones.stream()
						.map(Designacion::getId)
						.toList() +
				'}';
	}
	// =========================================================
	// Construcción / Builder
	// =========================================================
	public static class Builder {

		private final Set<Designacion> designaciones = new HashSet<>();
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

		public Builder agregarDesignacion(Designacion designacion) {
			this.designaciones.add(designacion);
			return this;
		}

		public Builder agregarDesignaciones(Set<Designacion> designaciones) {
			this.designaciones.addAll(designaciones);
			return this;
		}

		public Licencia build() {
			return new Licencia(this);
		}
	}
}
