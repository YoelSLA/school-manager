package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.BajaAsignacion;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.CaracteristicaAsignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaAsociadaADesignacionException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaDadaDeBajaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaTieneCaracteristicaException;
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

	@ManyToOne(optional = false)
	protected EmpleadoEducativo empleadoEducativo;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	private Designacion designacion;

	@Embedded
	private BajaAsignacion bajaAsignacion;

	@Embedded
	private Periodo periodo;

	@OneToOne(
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	@JoinColumn(name = "caracteristica_id")
	@Setter
	private CaracteristicaAsignacion caracteristica;

	protected Asignacion() {
	}

	public Asignacion(
			EmpleadoEducativo empleadoEducativo,
			Periodo periodo
	) {
		validarCreacionAsignacion(empleadoEducativo, periodo);
		this.empleadoEducativo = empleadoEducativo;
		this.periodo = periodo;
	}

	public void asignarEmpleado(EmpleadoEducativo empleado) {
		if (empleado == null) {
			throw new CampoObligatorioException("empleado");
		}
		this.empleadoEducativo = empleado;
	}

	public void asignarADesignacion(Designacion designacion) {
		if (designacion == null) {
			throw new CampoObligatorioException("designación");
		}
		if (this.designacion != null) {
			throw new AsignacionYaAsociadaADesignacionException();
		}
		this.designacion = designacion;
	}

	public void finalizarPorBajaDefinitiva(CausaBaja causa, LocalDate fecha) {
		if (estaDadaDeBajaEn(fecha)) {
			throw new AsignacionYaDadaDeBajaException();
		}

		this.bajaAsignacion = new BajaAsignacion(fecha, causa);

		designacion.notificarBajaDefinitivaDe(this, fecha);
	}

	public void aplicarCaracteristica(CaracteristicaAsignacion nueva) {
		if (this.caracteristica != null) {
			throw new AsignacionYaTieneCaracteristicaException();
		}
		nueva.validarAplicacion(this);
		this.caracteristica = nueva;
		nueva.alAsignarse(this);
	}

	@Transient
	public EstadoAsignacion getEstadoEn(LocalDate fecha) {

		// 1. Baja manda siempre
		if (bajaAsignacion != null && !fecha.isBefore(bajaAsignacion.getFechaBaja())) {
			return EstadoAsignacion.BAJA;
		}

		// 2. Todavía no empezó
		if (fecha.isBefore(periodo.getFechaDesde())) {
			return EstadoAsignacion.PENDIENTE;
		}

		// 3. Finalizada (ya terminó)
		if (periodo.getFechaHasta() != null && fecha.isAfter(periodo.getFechaHasta())) {
			return EstadoAsignacion.FINALIZADA;
		}

		// 4. Licencia
		if (estaEnLicenciaEn(fecha)) {
			return EstadoAsignacion.LICENCIA;
		}

		// 5. Activa
		return EstadoAsignacion.ACTIVA;
	}


	@Transient
	public LocalDate getFechaBaja() {
		return bajaAsignacion != null ? bajaAsignacion.getFechaBaja() : null;
	}

	@Transient
	public CausaBaja getCausaBaja() {
		return bajaAsignacion != null ? bajaAsignacion.getCausa() : null;
	}

	@Transient
	public abstract SituacionDeRevista getSituacionDeRevista();

	public boolean estaDadaDeBajaEn(LocalDate fecha) {
		return bajaAsignacion != null
				&& fecha != null
				&& !fecha.isBefore(bajaAsignacion.getFechaBaja());
	}

	public boolean tieneCaracteristica() {
		return caracteristica != null;
	}

	public boolean afectadaPor(Licencia licencia) {
		return licencia != null && periodo.seSuperponeCon(licencia.getPeriodo());
	}

	public boolean cubreDesignacionEn(LocalDate fecha) {
		return periodo.contiene(fecha) && !estaDadaDeBajaEn(fecha) && !estaEnLicenciaEn(fecha);
	}

	public boolean generaVacantePorLicenciaEn(LocalDate fecha) {
		return periodo.contiene(fecha) && !estaDadaDeBajaEn(fecha) && estaEnLicenciaEn(fecha);
	}

	private boolean estaEnLicenciaEn(LocalDate fecha) {
		return empleadoEducativo.getLicencias()
				.stream()
				.anyMatch(l -> l.estaVigenteEn(fecha) && afectadaPor(l));
	}

	private void validarCreacionAsignacion(EmpleadoEducativo empleadoEducativo, Periodo periodo) {
		if (empleadoEducativo == null) {
			throw new CampoObligatorioException("empleado educativo");
		}
		if (periodo == null) {
			throw new CampoObligatorioException("período");
		}
	}

	public boolean puedeGenerarVacanteDefinitiva() {
		return false;
	}

	public boolean estaActiva(LocalDate fecha) {
		return !estaDadaDeBajaEn(fecha);
	}

	public boolean estaVigenteEn(LocalDate fecha) {
		if (fecha == null)
			return false;

		return periodo.contiene(fecha) && !estaDadaDeBajaEn(fecha);
	}
}
