package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.DesignacionYaTieneTitularException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EstadoInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionNoAfectadaPorLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionNoVacantePorLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaCubiertaException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.*;

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
	private final List<Asignacion> asignaciones;

	@OneToMany(
			mappedBy = "designacion",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private final Set<FranjaHoraria> franjasHorarias;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Integer cupof;

	@ManyToOne(optional = false)
	@JoinColumn(name = "escuela_id", nullable = false)
	@Setter
	private Escuela escuela;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private RolEducativo rolEducativo;

	protected Designacion() {
		this.asignaciones = new ArrayList<>();
		this.franjasHorarias = new HashSet<>();
	}

	protected Designacion(Escuela escuela, Integer cupof, RolEducativo rolEducativo) {
		if (escuela == null) {
			throw new CampoObligatorioException("escuela");
		}
		if (cupof == null) {
			throw new CampoObligatorioException("cupof");
		}
		if (rolEducativo == null) {
			throw new CampoObligatorioException("rol educativo");
		}
		this.escuela = escuela;
		this.cupof = cupof;
		this.rolEducativo = rolEducativo;
		this.franjasHorarias = new HashSet<>();
		this.asignaciones = new ArrayList<>();
	}


	/* =========================
	   Asociación
	   ========================= */


	public void agregarFranjaHoraria(FranjaHoraria franja) {
		if (franja == null) {
			throw new CampoObligatorioException("franja horaria");
		}
		franja.setDesignacion(this);
		franjasHorarias.add(franja);
	}

	/* =========================
	   Coberturas
	   ========================= */

	public AsignacionSuplente cubrirConSuplente(
			Licencia licencia,
			EmpleadoEducativo suplente,
			LocalDate fechaInicio
	) {
		validarCoberturaPorLicencia(licencia, suplente, fechaInicio);

		LocalDate fechaFin = licencia.getPeriodo().getFechaHasta();
		Periodo periodo = new Periodo(fechaInicio, fechaFin);
		AsignacionSuplente asignacionSuplente = new AsignacionSuplente(suplente, periodo);

		agregarAsignacion(asignacionSuplente);
		return asignacionSuplente;
	}


	public AsignacionProvisional cubrirConProvisional(
			EmpleadoEducativo empleado,
			LocalDate fechaInicio
	) {

		validarCoberturaProvisional(empleado, fechaInicio);

		AsignacionProvisional asignacionProvisional = new AsignacionProvisional(this, empleado, fechaInicio);

		agregarAsignacion(asignacionProvisional);
		return asignacionProvisional;
	}

	public AsignacionTitular cubrirConTitular(
			EmpleadoEducativo empleado,
			LocalDate fechaTomaPosesion
	) {
		if (empleado == null) {
			throw new CampoObligatorioException("empleado");
		}
		if (fechaTomaPosesion == null) {
			throw new CampoObligatorioException("fecha de toma de posesión");
		}

		empleado.validarPuedeTomarPosesionEn(fechaTomaPosesion);

		if (tieneTitularActivo(fechaTomaPosesion)) {
			throw new DesignacionYaTieneTitularException(id);
		}

		AsignacionTitular titular = new AsignacionTitular(empleado, fechaTomaPosesion);

		agregarAsignacion(titular);
		return titular;
	}


	/* =========================
	   Reacción a eventos
	   ========================= */

	public void notificarBajaDefinitivaDe(
			Asignacion asignacion,
			LocalDate fechaBaja
	) {
		if (asignacion == null) {
			throw new CampoObligatorioException("asignación");
		}
		if (fechaBaja == null) {
			throw new CampoObligatorioException("fecha de baja");
		}

		if (!asignacion.puedeGenerarVacanteDefinitiva()) {
			return;
		}

		buscarSuplenteQueEjerceEn(fechaBaja)
				.ifPresent(suplente ->
						suplente.convertirseEnProvisional(fechaBaja, this)
				);
	}

	/* =========================
	   Consultas de estado
	   ========================= */

	public Optional<Asignacion> asignacionQueEjerceEn(LocalDate fecha) {
		if (fecha == null) {
			return Optional.empty();
		}

		List<Asignacion> candidatas = asignaciones.stream()
				.filter(a -> a.cubreDesignacionEn(fecha))
				.toList();

		if (candidatas.isEmpty()) {
			return Optional.empty();
		}

		if (candidatas.size() > 1) {
			throw new EstadoInvalidoException("Más de una asignación cubriendo el cargo en la fecha");
		}

		return Optional.of(candidatas.get(0));
	}

	@Transient
	public EstadoDesignacion getEstadoEn(LocalDate fecha) {
		if (fecha == null) {
			return EstadoDesignacion.VACANTE;
		}

		if (hayAsignacionQueEjerceEn(fecha)) {
			return EstadoDesignacion.CUBIERTA;
		}

		if (hayVacantePorLicenciaEn(fecha)) {
			return EstadoDesignacion.LICENCIA;
		}


		return EstadoDesignacion.VACANTE;
	}

	/* =========================
	   Helpers privados
	   ========================= */

	private boolean hayAsignacionQueEjerceEn(LocalDate fecha) {
		if (fecha == null) {
			return false;
		}

		return asignaciones.stream().anyMatch(a -> a.cubreDesignacionEn(fecha));
	}


	private boolean hayVacantePorLicenciaEn(LocalDate fecha) {
		return asignaciones.stream().anyMatch(
				a -> a.generaVacantePorLicenciaEn(fecha)
		);
	}

	private Optional<AsignacionSuplente> buscarSuplenteQueEjerceEn(LocalDate fecha) {
		return asignaciones.stream()
				.filter(AsignacionSuplente.class::isInstance)
				.map(AsignacionSuplente.class::cast)
				.filter(a -> a.cubreDesignacionEn(fecha))
				.findFirst();
	}

	private boolean tieneTitularActivo(LocalDate fecha) {
		return asignaciones.stream()
				.anyMatch(a ->
						a.getSituacionDeRevista() == SituacionDeRevista.TITULAR
								&& a.estaActiva(fecha)
				);
	}

	private void agregarAsignacion(Asignacion asignacion) {
		if (asignacion == null) {
			throw new CampoObligatorioException("asignación");
		}

		LocalDate inicio = asignacion.getPeriodo().getFechaDesde();

		if (hayAsignacionQueEjerceEn(inicio)) {
			throw new DesignacionYaCubiertaException(id);
		}

		asignacion.asignarADesignacion(this);
		asignaciones.add(asignacion);
		asignacion.getEmpleadoEducativo().agregarAsignacion(asignacion);
	}

	private void validarCoberturaPorLicencia(
			Licencia licencia,
			EmpleadoEducativo suplente,
			LocalDate fechaInicio
	) {
		if (licencia == null) {
			throw new CampoObligatorioException("licencia");
		}
		if (suplente == null) {
			throw new CampoObligatorioException("empleado educativo");
		}
		if (fechaInicio == null) {
			throw new CampoObligatorioException("fecha de inicio de la asignación");
		}

		// 1️⃣ La licencia debe afectar a esta designación
		if (!licencia.afectaDesignacion(this, fechaInicio)) {
			throw new DesignacionNoAfectadaPorLicenciaException(
					id,
					licencia.getId()
			);
		}

		// 2️⃣ No puede haber alguien ejerciendo
		if (hayAsignacionQueEjerceEn(fechaInicio)) {
			throw new DesignacionYaCubiertaException(id);
		}

		// 3️⃣ Debe existir vacante por licencia
		if (!hayVacantePorLicenciaEn(fechaInicio)) {
			throw new DesignacionNoVacantePorLicenciaException(id);
		}

		// 4️⃣ Rango válido
		LocalDate fechaFin = licencia.getPeriodo().getFechaHasta();
		if (fechaFin.isBefore(fechaInicio)) {
			throw new RangoFechasInvalidoException(
					"La fecha desde no puede ser posterior a la fecha hasta"
			);
		}
	}

	private void validarCoberturaProvisional(
			EmpleadoEducativo empleado,
			LocalDate fechaInicio
	) {
		if (empleado == null) {
			throw new CampoObligatorioException("empleado educativo");
		}

		if (fechaInicio == null) {
			throw new CampoObligatorioException("fecha de inicio de la asignación");
		}

		if (hayAsignacionQueEjerceEn(fechaInicio)) {
			throw new DesignacionYaCubiertaException(id);
		}
	}


}
