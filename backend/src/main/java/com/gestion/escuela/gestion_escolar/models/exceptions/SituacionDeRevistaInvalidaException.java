package com.gestion.escuela.gestion_escolar.models.exceptions;

public class SituacionDeRevistaInvalidaException extends RuntimeException {

	public SituacionDeRevistaInvalidaException() {
		super("Una designación con empleado debe tener situación de revista");
	}
}
