package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

import java.time.LocalDate;

public class EstadoAsistenciaDia {

	private final LocalDate fecha;
	private final EstadoAsistencia estadoAsistencia;
	private final TipoLicencia tipoLicencia;
	private final Licencia licencia;
	private final Long asistenciaId;

	private EstadoAsistenciaDia(
			LocalDate fecha,
			EstadoAsistencia estadoAsistencia,
			TipoLicencia tipoLicencia,
			Licencia licencia,
			Long asistenciaId
	) {
		this.fecha = fecha;
		this.estadoAsistencia = estadoAsistencia;
		this.tipoLicencia = tipoLicencia;
		this.licencia = licencia;
		this.asistenciaId = asistenciaId;
	}

	// 🔹 Día presente (sin registro manual ni licencia)
	public static EstadoAsistenciaDia presente(LocalDate fecha) {
		return new EstadoAsistenciaDia(
				fecha,
				EstadoAsistencia.PRESENTE,
				null,
				null,
				null
		);
	}

	// 🔹 Día con asistencia manual persistida
	public static EstadoAsistenciaDia manual(Asistencia asistencia) {
		return new EstadoAsistenciaDia(
				asistencia.getFecha(),
				asistencia.getEstadoAsistencia(),
				asistencia.getTipoLicencia(),
				null,
				asistencia.getId()
		);
	}

	// 🔹 Día cubierto por licencia prolongada
	public static EstadoAsistenciaDia porLicencia(
			LocalDate fecha,
			Licencia licencia
	) {
		return new EstadoAsistenciaDia(
				fecha,
				EstadoAsistencia.AUSENTE,
				licencia.getTipoLicencia(),
				licencia,
				null
		);
	}

	// Getters

	public LocalDate getFecha() {
		return fecha;
	}

	public EstadoAsistencia getEstadoAsistencia() {
		return estadoAsistencia;
	}

	public TipoLicencia getTipoLicencia() {
		return tipoLicencia;
	}

	public Licencia getLicencia() {
		return licencia;
	}

	public Long getAsistenciaId() {
		return asistenciaId;
	}

	public boolean esManual() {
		return asistenciaId != null;
	}

	public boolean esPorLicencia() {
		return licencia != null;
	}

	public boolean esPresente() {
		return estadoAsistencia == EstadoAsistencia.PRESENTE
				&& asistenciaId == null
				&& licencia == null;
	}
}