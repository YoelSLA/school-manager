package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.exceptions.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "asignacion")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo_asignacion")
@Getter
public abstract class Asignacion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "empleado_id")
	private EmpleadoEducativo empleadoEducativo;

	@ManyToOne(optional = false)
	@JoinColumn(name = "designacion_id")
	@Setter
	private Designacion designacion;

	@Column(nullable = false)
	private LocalDate fechaTomaPosesion;

	@Column(nullable = false)
	private LocalDate fechaCese;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private SituacionDeRevista situacionDeRevista;

	private LocalDate fechaBaja;

	@Enumerated(EnumType.STRING)
	private CausaBaja causaBaja;

	protected Asignacion() {
	}

	public Asignacion(
			Designacion designacion,
			EmpleadoEducativo empleadoEducativo,
			LocalDate fechaTomaPosesion,
			LocalDate fechaCese,
			SituacionDeRevista situacionDeRevista
	) {
		validarCreacion(designacion, empleadoEducativo, fechaTomaPosesion, fechaCese, situacionDeRevista);

		this.designacion = designacion;
		this.empleadoEducativo = empleadoEducativo;
		this.fechaTomaPosesion = fechaTomaPosesion;
		this.fechaCese = fechaCese;
		this.situacionDeRevista = situacionDeRevista;
		this.fechaBaja = null;
		this.causaBaja = null;
	}

	public void registrarBaja(CausaBaja causa) {
		if (causa == null) {
			throw new IllegalArgumentException("La causa de baja es obligatoria");
		}
	}

	private void validarCreacion(
			Designacion designacion,
			EmpleadoEducativo empleado,
			LocalDate fechaTomaPosesion,
			LocalDate fechaCese,
			SituacionDeRevista situacion
	) {
		if (designacion == null) {
			throw new DesignacionObligatoriaException();
		}

		if (empleado == null) {
			throw new EmpleadoEducativoObligatorioException();
		}

		if (situacion == null) {
			throw new SituacionDeRevistaObligatoriaException();
		}

		if (fechaTomaPosesion == null || fechaCese == null) {
			throw new FechasAsignacionObligatoriasException();
		}

		if (fechaCese.isBefore(fechaTomaPosesion)) {
			throw new PeriodoAsignacionInvalidoException();
		}
	}

	/* ======================================================
	   VIGENCIA
	   ====================================================== */

	/**
	 * Indica si la asignación está vigente en una fecha puntual.
	 * <p>
	 * Reglas:
	 * - La fecha consultada no puede ser null
	 * - La asignación no debe tener baja administrativa
	 * - La fecha debe ser igual o posterior a la fecha de toma de posesión
	 * - La fecha debe ser anterior o igual a la fecha de cese
	 * (si la fecha de cese es null, se considera vigente indefinidamente)
	 *
	 * @param fecha fecha a evaluar
	 * @return true si la asignación está vigente en esa fecha
	 */
	public boolean estaDisponibleEn(LocalDate fecha) {
		if (fecha == null || fechaBaja != null) {
			return false;
		}

		boolean despuesDelInicio = !fecha.isBefore(fechaTomaPosesion);

		boolean antesDelFin = fechaCese == null || !fecha.isAfter(fechaCese);

		return despuesDelInicio && antesDelFin;
	}

	/* ======================================================
	   PERÍODOS
	   ====================================================== */

	/**
	 * Indica si la asignación se superpone con un período de tiempo.
	 * <p>
	 * Reglas:
	 * - Si la asignación tiene baja administrativa, nunca se superpone
	 * - Una asignación sin fecha de cese se considera vigente
	 * hasta el infinito (LocalDate.MAX)
	 * - Dos períodos se superponen si comparten al menos un día
	 *
	 * @param desde fecha inicial del período (inclusive)
	 * @param hasta fecha final del período (inclusive)
	 * @return true si la asignación se superpone con el período dado
	 */
	public boolean seSuperponeCon(
			LocalDate desde,
			LocalDate hasta
	) {
		if (fechaBaja != null) {
			return false;
		}

		LocalDate inicioAsignacion = fechaTomaPosesion;
		LocalDate finAsignacion = fechaCese != null
				? fechaCese
				: LocalDate.MAX;

		return !finAsignacion.isBefore(desde)
				&& !inicioAsignacion.isAfter(hasta);
	}

	/* ======================================================
	   LICENCIAS
	   ====================================================== */

	/**
	 * Indica si esta asignación queda afectada por una licencia.
	 * <p>
	 * Una asignación está afectada por una licencia si:
	 * - La asignación se superpone con el período de la licencia
	 * - No tiene baja administrativa
	 * <p>
	 * No evalúa:
	 * - Si la asignación está cubierta por un suplente
	 * - El tipo de licencia
	 *
	 * @param licencia licencia del empleado
	 * @return true si la asignación queda afectada por la licencia
	 */
	public boolean afectadaPor(Licencia licencia) {
		return this.seSuperponeCon(
				licencia.getFechaDesde(),
				licencia.getFechaHasta()
		);
	}

	/* ======================================================
	   UTILIDADES
	   ====================================================== */

	/**
	 * Indica si la asignación tiene baja administrativa.
	 *
	 * @return true si la asignación fue dada de baja
	 */
	public boolean tieneBaja() {
		return fechaBaja != null;
	}

}
