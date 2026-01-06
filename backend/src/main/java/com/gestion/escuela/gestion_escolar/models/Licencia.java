package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.FechasLicenciaObligatoriasException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasLicenciaInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.TipoLicenciaObligatorioException;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "licencia")
@Getter
public class Licencia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TipoLicencia tipoLicencia;

	@Column(nullable = false)
	private LocalDate fechaDesde;

	@Column(nullable = false)
	private LocalDate fechaHasta;

	@ManyToOne(optional = false)
	@JoinColumn(name = "asignacion_id")
	private Asignacion asignacion;

	@Column(length = 500)
	private String descripcion;

	protected Licencia() {
		// JPA
	}

	public Licencia(Asignacion asignacion, TipoLicencia tipoLicencia, LocalDate fechaDesde, LocalDate fechaHasta, String descripcion) {
		validarTipoLicencia(tipoLicencia);
		validarRangoDeFechas(fechaDesde, fechaHasta);
		this.asignacion = asignacion;
		this.tipoLicencia = tipoLicencia;
		this.fechaDesde = fechaDesde;
		this.fechaHasta = fechaHasta;
		this.descripcion = descripcion;
	}

	void asociarAsignacion(Asignacion asignacion) {
		this.asignacion = asignacion;
	}

    /* ==========================
       COMPORTAMIENTO
       ========================== */

	public boolean estaActivaHoy() {
		LocalDate hoy = LocalDate.now();
		return !hoy.isBefore(fechaDesde) && !hoy.isAfter(fechaHasta);
	}

	public long dias() {
		return ChronoUnit.DAYS.between(fechaDesde, fechaHasta) + 1;
	}

	public boolean estaVigenteEnFecha(LocalDate fecha) {
		return !fecha.isBefore(fechaDesde) && !fecha.isAfter(fechaHasta);
	}

	public boolean seSuperponeCon(LocalDate desde, LocalDate hasta) {
		return !this.fechaDesde.isAfter(hasta) && !desde.isAfter(this.fechaHasta);
	}


    /* ==========================
       VALIDACIONES
       ========================== */

	private void validarTipoLicencia(TipoLicencia tipoLicencia) {
		if (tipoLicencia == null) {
			throw new TipoLicenciaObligatorioException();
		}
	}

	private void validarRangoDeFechas(LocalDate desde, LocalDate hasta) {
		if (desde == null || hasta == null) {
			throw new FechasLicenciaObligatoriasException();
		}

		if (desde.isAfter(hasta)) {
			throw new RangoFechasLicenciaInvalidoException();
		}
	}
}
