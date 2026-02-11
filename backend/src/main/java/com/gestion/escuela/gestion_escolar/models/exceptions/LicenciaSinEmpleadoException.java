package com.gestion.escuela.gestion_escolar.models.exceptions;

public class LicenciaSinEmpleadoException extends RuntimeException {
	public LicenciaSinEmpleadoException() {
		super("La licencia no tiene un empleado asignado");
	}
}
