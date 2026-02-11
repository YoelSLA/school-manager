package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.LicenciaSinEmpleadoException;
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
			TipoLicencia tipoLicencia,
			Periodo periodo,
			String descripcion
	) {
		if (tipoLicencia == null) {
			throw new CampoObligatorioException("tipo de licencia");
		}
		this.tipoLicencia = tipoLicencia;
		this.descripcion = descripcion;
		this.periodo = periodo;
		this.designaciones = new HashSet<>();
	}

	public Licencia renovar(
			TipoLicencia tipoLicencia,
			LocalDate nuevoHasta,
			String descripcion
	) {

		LocalDate nuevoDesde = periodo.getFechaHasta().plusDays(1);

		Licencia nueva = crearRenovacion(tipoLicencia, new Periodo(nuevoDesde, nuevoHasta), descripcion);

		enlazarCon(nueva);

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

	public boolean seSuperponeCon(Periodo otro) {
		return periodo.seSuperponeCon(otro);
	}

	@Transient
	public EstadoLicencia getEstadoEn(LocalDate fecha) {

		if (!periodo.contiene(fecha)) {
			return EstadoLicencia.INACTIVA;
		}

		return estaCubiertaEn(fecha)
				? EstadoLicencia.CUBIERTA
				: EstadoLicencia.DESCUBIERTA;
	}

	public Integer dias() {
		return Math.toIntExact(periodo.dias());
	}

	public Set<Designacion> getDesignaciones() {
		return Collections.unmodifiableSet(designaciones);
	}

	public void afectarDesignacion(Designacion designacion) {
		if (designacion == null) {
			throw new CampoObligatorioException("designación");
		}
		this.designaciones.add(designacion);
	}

	public void asignarEmpleadoEducativo(EmpleadoEducativo empleadoEducativo) {
		if (empleadoEducativo == null) {
			throw new CampoObligatorioException("empleado educativo");
		}
		this.empleadoEducativo = empleadoEducativo;
	}

	public boolean afectaDesignacion(Designacion designacion, LocalDate fecha) {
		if (fecha == null || !incluyeDesignacion(designacion)) {
			return false;
		}

		return empleadoEducativo.getAsignaciones().stream()
				.filter(a -> a.getDesignacion().equals(designacion))
				.anyMatch(a -> a.generaVacantePorLicenciaEn(fecha));
	}

	/**
	 * Inicializa las designaciones afectadas por esta licencia.
	 * Debe usarse solo al momento de creación.
	 */
	public void inicializarDesignacionesAfectadas() {
		if (empleadoEducativo == null) {
			throw new LicenciaSinEmpleadoException();
		}

		this.designaciones.addAll(
				empleadoEducativo.designacionesAfectadasPor(this)
		);
	}

	public boolean estaVigenteEn(LocalDate fecha) {
		if (fecha == null) {
			return false;
		}

		return periodo.contiene(fecha);
	}

	private void enlazarCon(Licencia siguiente) {
		this.licenciaSiguiente = siguiente;
		siguiente.licenciaAnterior = this;
	}

	private Licencia crearRenovacion(
			TipoLicencia tipoLicencia,
			Periodo periodo,
			String descripcion
	) {
		Licencia nueva = new Licencia(
				tipoLicencia,
				periodo,
				descripcion
		);

		nueva.asignarEmpleadoEducativo(this.empleadoEducativo);
		nueva.designaciones.addAll(this.designaciones);

		return nueva;
	}

	private boolean estaCubiertaEn(LocalDate fecha) {
		if (!estaVigenteEn(fecha)) {
			return false;
		}

		return designaciones.stream()
				.allMatch(d -> d.getEstadoEn(fecha) == EstadoDesignacion.CUBIERTA);
	}

	private boolean incluyeDesignacion(Designacion designacion) {
		return designacion != null && designaciones.contains(designacion);
	}

	private Licencia licenciaRaiz() {
		Licencia actual = this;

		while (actual.licenciaAnterior != null) {
			actual = actual.licenciaAnterior;
		}

		return actual;
	}
}
