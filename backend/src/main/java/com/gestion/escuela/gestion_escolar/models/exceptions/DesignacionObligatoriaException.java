package com.gestion.escuela.gestion_escolar.models.exceptions;

public class DesignacionObligatoriaException extends RuntimeException {

	public DesignacionObligatoriaException() {
		super("La designación es obligatoria.");
	}
}