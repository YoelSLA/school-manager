package com.gestion.escuela.gestion_escolar.models.exceptions;

public class EmpleadoEducativoObligatorioException extends RuntimeException {

	public EmpleadoEducativoObligatorioException() {
		super("El empleado es obligatorio");
	}
}
