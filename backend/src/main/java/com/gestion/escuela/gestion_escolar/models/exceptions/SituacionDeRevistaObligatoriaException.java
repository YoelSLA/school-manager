package com.gestion.escuela.gestion_escolar.models.exceptions;

public class SituacionDeRevistaObligatoriaException extends RuntimeException {

	public SituacionDeRevistaObligatoriaException() {
		super("La situación de revista es obligatoria");
	}
}
