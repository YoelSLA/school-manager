package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.BajaAsignacion;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaDadaDeBajaException;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

import static com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista.PROVISIONAL;

@Entity
@Table(name = "asignacion")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo_asignacion")
@Getter
public abstract class Asignacion {

	@ManyToOne(optional = false)
	protected EmpleadoEducativo empleadoEducativo;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	private Designacion designacion;

	@Embedded
	private Periodo periodo;

	@Embedded
	private BajaAsignacion bajaAsignacion;

	@Column(nullable = false)
	private Integer secuencia;

	protected Asignacion() {
		// JPA
	}

	protected Asignacion(
			EmpleadoEducativo empleadoEducativo,
			Designacion designacion,
			Periodo periodo,
			Integer secuencia
	) {
		validarCrear(empleadoEducativo, designacion, periodo, secuencia);

		this.empleadoEducativo = empleadoEducativo;
		this.designacion = designacion;
		this.periodo = periodo;
		this.secuencia = secuencia;
	}

	public void finalizarPorBajaDefinitiva(CausaBaja causaBaja, LocalDate fechaBaja) {

		if (estaDadaDeBajaEn(fechaBaja)) {
			throw new AsignacionYaDadaDeBajaException();
		}

		boolean generaVacante = this.puedeGenerarVacanteDefinitiva();

		this.darDeBajaEn(fechaBaja);

		this.bajaAsignacion = new BajaAsignacion(fechaBaja, causaBaja);

		if (generaVacante) {
			designacion.notificarBajaDefinitivaDe(this, fechaBaja);
		}
	}

	public boolean estaActivaEn(LocalDate fecha) {
		return getEstadoEn(fecha) == EstadoAsignacion.ACTIVA;
	}

	public boolean estaEjerciendoEn(LocalDate fecha) {
		return getEstadoEn(fecha).estaEjerciendo();
	}

	public boolean estaEnLicenciaEn(LocalDate fecha) {
		return getEstadoEn(fecha) == EstadoAsignacion.LICENCIA;
	}

	public boolean puedeGenerarVacanteDefinitiva() {
		return false;
	}

	@Transient
	public EstadoAsignacion getEstadoEn(LocalDate fecha) {
		Validaciones.noNulo(fecha, "fecha");

		if (estaDadaDeBajaEn(fecha)) {
			return EstadoAsignacion.BAJA;
		}

		if (estaPendienteEn(fecha)) {
			return EstadoAsignacion.PENDIENTE;
		}

		if (estaFinalizadaEn(fecha)) {
			return EstadoAsignacion.FINALIZADA;
		}

		if (empleadoEducativo.estaEnLicenciaPara(this, fecha)) {
			return EstadoAsignacion.LICENCIA;
		}

		return EstadoAsignacion.ACTIVA;
	}

	@Transient
	public LocalDate getFechaBaja() {
		return bajaAsignacion != null
				? bajaAsignacion.getFechaBaja()
				: null;
	}

	@Transient
	public CausaBaja getCausaBaja() {
		return bajaAsignacion != null
				? bajaAsignacion.getCausa()
				: null;
	}

	@Transient
	public abstract SituacionDeRevista getSituacionDeRevista();

	@Override
	public String toString() {
		return getClass().getSimpleName() + "{ " +
				"id = " + id +
				", empleadoId = " + (empleadoEducativo != null ? empleadoEducativo.getId() : null) +
				", designacionId = " + (designacion != null ? designacion.getId() : null) +
				", periodo = " + periodo +
				", bajaAsignacion = " + (bajaAsignacion != null) +
				" }";
	}

	public boolean seSuperponeCon(Periodo periodo) {
		return this.periodo.seSuperponeCon(periodo);
	}

	public boolean seSuperponeCon(Asignacion asignacion) {
		return this.periodo.seSuperponeCon(asignacion.periodo);
	}

	public RolEducativo getRolEducativo() {
		return designacion.getRolEducativo();
	}

	public void actualizar(
			EmpleadoEducativo empleado,
			LocalDate fechaTomaPosesion,
			LocalDate fechaCese,
			Integer secuencia
	) {
		if(this.getSituacionDeRevista() == PROVISIONAL) {
			Validaciones.noNulo(fechaCese, "fecha de cese");
		}

		this.actualizar(empleado, fechaTomaPosesion, secuencia);
		this.periodo = Periodo.cerrado(fechaTomaPosesion, fechaCese);
	}

	public void actualizar(
			EmpleadoEducativo empleado,
			LocalDate fechaTomaPosesion,
			Integer secuencia
	) {

		Validaciones.noNulo(empleado, "empleadoEducativoBasico educativo");
		Validaciones.noNulo(fechaTomaPosesion, "fecha de toma de posesión");
		Validaciones.noNulo(secuencia, "secuencia");

		this.empleadoEducativo = empleado;
		this.secuencia = secuencia;
		this.periodo = Periodo.cerrado(fechaTomaPosesion, this.periodo.getFechaHasta());
	}

	public void setDesignacion(Designacion designacion) {
		Validaciones.noNulo(designacion, "designacion");
		this.designacion = designacion;
	}

	public void setEmpleadoEducativo(EmpleadoEducativo empleado) {
		Validaciones.noNulo(empleado, "empleadoEducativoBasico");
		this.empleadoEducativo = empleado;
	}

	private void validarCrear(
			EmpleadoEducativo empleadoEducativo,
			Designacion designacion,
			Periodo periodo,
			Integer secuencia) {
		Validaciones.noNulo(empleadoEducativo, "empleadoEducativoBasico educativo");
		Validaciones.noNulo(designacion, "designacion");
		Validaciones.noNulo(periodo, "periodo");
		Validaciones.noNulo(secuencia, "secuencia");
	}

	private void darDeBajaEn(LocalDate fechaBaja) {
		Validaciones.noNulo(fechaBaja, "fecha bajaAsignacion");

		if (!periodo.estaVigenteEn(fechaBaja)) {
			throw new IllegalStateException("La asignación no está vigente en esa fecha");
		}

		this.periodo = this.periodo.cerrarEn(fechaBaja);
	}

	private boolean estaDadaDeBajaEn(LocalDate fecha) {
		return bajaAsignacion != null && !fecha.isBefore(bajaAsignacion.getFechaBaja());
	}

	private boolean estaPendienteEn(LocalDate fecha) {
		return fecha.isBefore(periodo.getFechaDesde());
	}

	private boolean estaFinalizadaEn(LocalDate fecha) {
		return periodo.getFechaHasta() != null && fecha.isAfter(periodo.getFechaHasta());
	}


}