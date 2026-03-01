package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "licencia")
@Getter
public class Licencia {

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

	protected Licencia() {

		this.designaciones = new HashSet<>();

	}

	public Licencia(
			EmpleadoEducativo empleadoEducativo,
			TipoLicencia tipoLicencia,
			Periodo periodo,
			String descripcion,
			Set<Designacion> designaciones
	) {

		Validaciones.noNulo(empleadoEducativo, "empleado educativo");
		Validaciones.noNulo(tipoLicencia, "tipo licencia");
		Validaciones.noNulo(periodo, "periodo");
		Validaciones.noVacio(designaciones, "designación afectada");

		this.empleadoEducativo = empleadoEducativo;
		this.tipoLicencia = tipoLicencia;
		this.periodo = periodo;
		this.descripcion = descripcion;
		this.designaciones = new HashSet<>(designaciones);

	}

	public void asignarEmpleadoEducativo(EmpleadoEducativo empleadoEducativo) {
		if (empleadoEducativo == null) {
			throw new CampoObligatorioException("empleado educativo");
		}
		this.empleadoEducativo = empleadoEducativo;
	}

	public boolean estaVigenteEn(LocalDate fecha) {
		return periodo.estaVigenteEn(fecha);
	}

	public boolean afectaA(Designacion designacion, LocalDate fecha) {
		return periodo.estaVigenteEn(fecha) && designaciones.contains(designacion);
	}

	public Integer dias() {
		return Math.toIntExact(periodo.dias());
	}

	@Transient
	public EstadoLicencia getEstadoEn(LocalDate fecha) {

		if (!periodo.estaVigenteEn(fecha)) {
			return EstadoLicencia.INACTIVA;
		}

		return estaCubiertaEn(fecha)
				? EstadoLicencia.CUBIERTA
				: EstadoLicencia.DESCUBIERTA;
	}

	public Licencia renovar(
			TipoLicencia tipoLicencia,
			LocalDate nuevoHasta,
			String descripcion
	) {

		if (periodo.esAbierto()) {
			throw new IllegalStateException("No se puede renovar una licencia sin fecha de fin");
		}

		Validaciones.noNulo(nuevoHasta, "nueva hasta");

		if (!nuevoHasta.isAfter(periodo.getFechaHasta())) {
			throw new IllegalArgumentException(
					"La fecha fin de renovación debe ser posterior a la actual"
			);
		}

		LocalDate nuevoDesde = periodo.getFechaHasta().plusDays(1);

		Licencia nueva = new Licencia(
				this.empleadoEducativo,
				tipoLicencia,
				new Periodo(nuevoDesde, nuevoHasta),
				descripcion,
				this.designaciones
		);

		this.licenciaSiguiente = nueva;
		nueva.licenciaAnterior = this;

		return nueva;

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

	public Set<Designacion> getDesignaciones() {
		return Collections.unmodifiableSet(designaciones);
	}

	@Override
	public String toString() {
		return "Licencia{" +
				"id=" + id +
				", empleadoId=" + (empleadoEducativo != null ? empleadoEducativo.getId() : null) +
				", tipoLicencia=" + tipoLicencia +
				", descripcion='" + descripcion + '\'' +
				", periodo=" + periodo +
				", licenciaAnteriorId=" + (licenciaAnterior != null ? licenciaAnterior.getId() : null) +
				", licenciaSiguienteId=" + (licenciaSiguiente != null ? licenciaSiguiente.getId() : null) +
				", designacionesIds=" + designaciones.stream()
				.map(Designacion::getId)
				.toList() +
				'}';
	}

	private boolean estaCubiertaEn(LocalDate fecha) {
		if (!estaVigenteEn(fecha)) {
			return false;
		}

		return designaciones.stream()
				.allMatch(d -> d.getEstadoEn(fecha) == EstadoDesignacion.CUBIERTA);
	}

	private Licencia licenciaRaiz() {
		Licencia actual = this;

		while (actual.licenciaAnterior != null) {
			actual = actual.licenciaAnterior;
		}

		return actual;
	}

	public void validarFechaValidaParaCobertura(LocalDate fecha) {
		if (fecha.isBefore(this.periodo.getFechaDesde())) {
			throw new RangoFechasInvalidoException(this.periodo.getFechaDesde(), fecha);
		}
	}
}
