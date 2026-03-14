package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.BajaAsignacion;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.CaracteristicaAsignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaDadaDeBajaException;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

import static com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista.TITULAR;

@Entity
@Table(name = "asignacion")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "tipo_asignacion")
@Getter
public abstract class Asignacion {

	// =========================
	// 🔹 CAMPOS
	// =========================

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

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "caracteristica_id")
	private CaracteristicaAsignacion caracteristica;

	protected Asignacion() {
	}

	public Asignacion(
			EmpleadoEducativo empleadoEducativo,
			Designacion designacion,
			Periodo periodo
	) {
		validarCrearAsignacion(empleadoEducativo, designacion, periodo);
		this.empleadoEducativo = empleadoEducativo;
		this.designacion = designacion;
		this.periodo = periodo;
	}

	public void finalizarPorBajaDefinitiva(CausaBaja causaBaja, LocalDate fechaBaja) {

		if (estaDadaDeBajaEn(fechaBaja)) {
			throw new AsignacionYaDadaDeBajaException();
		}

		this.darDeBajaEn(fechaBaja);

		this.bajaAsignacion = new BajaAsignacion(fechaBaja, causaBaja);

		if (this.puedeGenerarVacanteDefinitiva()) {
			designacion.notificarBajaDefinitivaDe(this, fechaBaja);
		}
	}

	public void asignarEmpleado(EmpleadoEducativo empleadoEducativo) {
		Validaciones.noNulo(empleadoEducativo, "empleado educativo");
		this.empleadoEducativo = empleadoEducativo;
	}

	public void aplicarCaracteristica(CaracteristicaAsignacion nueva) {
		throw new UnsupportedOperationException("Solo una asignación TITULAR puede tener característica");
	}

	public void darDeBajaEn(LocalDate fechaBaja) {
		Validaciones.noNulo(fechaBaja, "fecha baja");

		if (!periodo.estaVigenteEn(fechaBaja)) {
			throw new IllegalStateException("La asignación no está vigente en esa fecha");
		}

		this.periodo = this.periodo.cerrarEn(fechaBaja);
	}

	public boolean estaActivaEn(LocalDate fecha) {
		return getEstadoEn(fecha) == EstadoAsignacion.ACTIVA;
	}

	public boolean estaEnLicenciaEn(LocalDate fecha) {
		return getEstadoEn(fecha) == EstadoAsignacion.LICENCIA;
	}

	public boolean puedeGenerarVacanteDefinitiva() {
		return false;
	}

	public boolean estaDadaDeBajaEn(LocalDate fecha) {
		return bajaAsignacion != null && !fecha.isBefore(bajaAsignacion.getFechaBaja());
	}

	public boolean tieneCaracteristica() {
		return caracteristica != null;
	}

	@Transient
	public EstadoAsignacion getEstadoEn(LocalDate fecha) {
		Validaciones.noNulo(fecha, "fecha");

		if (bajaAsignacion != null && !fecha.isBefore(bajaAsignacion.getFechaBaja())) {
			return EstadoAsignacion.BAJA;
		}

		if (fecha.isBefore(periodo.getFechaDesde())) {
			return EstadoAsignacion.PENDIENTE;
		}

		if (periodo.getFechaHasta() != null && fecha.isAfter(periodo.getFechaHasta())) {
			return EstadoAsignacion.FINALIZADA;
		}

		if (empleadoEducativo.estaEnLicenciaPara(designacion, fecha)) {
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

	protected void asignarCaracteristica(CaracteristicaAsignacion nueva) {
		this.caracteristica = nueva;
	}

	private void validarCrearAsignacion(
			EmpleadoEducativo empleadoEducativo,
			Designacion designacion,
			Periodo periodo
	) {
		Validaciones.noNulo(empleadoEducativo, "empleado educativo");
		Validaciones.noNulo(designacion, "designacion");
		Validaciones.noNulo(periodo, "periodo");
	}

	@Override
	public String toString() {
		return getClass().getSimpleName() + "{ " +
				"id = " + id +
				", empleadoId = " + (empleadoEducativo != null ? empleadoEducativo.getId() : null) +
				", designacionId = " + (designacion != null ? designacion.getId() : null) +
				", periodo = " + periodo +
				", baja = " + (bajaAsignacion != null) +
				", caracteristicaId = " + (caracteristica != null ? caracteristica.getId() : null) +
				" }";
	}

	public boolean seSuperponeCon(Periodo periodo) {
		return this.periodo.seSuperponeCon(periodo);
	}

	public boolean estaEjerciendoEn(LocalDate fecha) {

		boolean activa = estaActivaEn(fecha);
		boolean licencia = estaEnLicenciaEn(fecha);
		boolean ejerce = activa && !licencia;

		System.out.println("DEBUG Asignacion " + id);
		System.out.println("fecha: " + fecha);
		System.out.println("activa: " + activa);
		System.out.println("licencia: " + licencia);
		System.out.println("ejerce: " + ejerce);

		return ejerce;
	}

	public boolean esTitular() {
		return getSituacionDeRevista() == TITULAR;
	}

	public void actualizar(
			EmpleadoEducativo empleado,
			LocalDate fechaTomaPosesion,
			LocalDate fechaCese
	) {

		Validaciones.noNulo(empleado, "empleado educativo");
		Validaciones.noNulo(fechaTomaPosesion, "fecha de toma de posesión");

		this.empleadoEducativo = empleado;
		this.periodo = new Periodo(fechaTomaPosesion, fechaCese);
	}

}