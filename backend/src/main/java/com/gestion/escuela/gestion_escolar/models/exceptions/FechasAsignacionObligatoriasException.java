package com.gestion.escuela.gestion_escolar.models.exceptions;

public class FechasAsignacionObligatoriasException extends RuntimeException {

	public FechasAsignacionObligatoriasException() {
		super("Las fechas son obligatorias");
	}
}
