package com.gestion.escuela.gestion_escolar.models.exceptions;

public class EmpleadoInactivoException extends RuntimeException {

	private final Long empleadoId;

	public EmpleadoInactivoException(Long empleadoId) {
		super("El empleado " + empleadoId + " se encuentra inactivo");
		this.empleadoId = empleadoId;
	}

	public Long getEmpleadoId() {
		return empleadoId;
	}
}
