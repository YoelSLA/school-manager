package com.gestion.escuela.gestion_escolar.models.exceptions;

import java.time.LocalDate;

public class EmpleadoEnLicenciaException extends RuntimeException {

	private final Long empleadoId;
	private final LocalDate fecha;

	public EmpleadoEnLicenciaException(Long empleadoId, LocalDate fecha) {
		super(
				"El empleado " + empleadoId +
						" se encuentra de licencia en la fecha " + fecha
		);
		this.empleadoId = empleadoId;
		this.fecha = fecha;
	}

	public Long getEmpleadoId() {
		return empleadoId;
	}

	public LocalDate getFecha() {
		return fecha;
	}
}
