package com.gestion.escuela.gestion_escolar.models.exceptions;

public class CupofDuplicadoException extends RuntimeException {

	public CupofDuplicadoException(Integer cupof) {
		super("Ya existe una designación con el número " + cupof + " en la escuela seleccionada");
	}
}
