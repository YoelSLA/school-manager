package com.gestion.escuela.gestion_escolar.models.exceptions;

public class EmpleadoConDesignacionesException extends RuntimeException {

	public EmpleadoConDesignacionesException() {
		super("No se puede desactivar un empleado con designaciones asignadas");
	}
}
