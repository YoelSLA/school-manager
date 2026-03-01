package com.gestion.escuela.gestion_escolar.models.exceptions;

public class CuilInvalidoException extends RuntimeException {

	public CuilInvalidoException(String cuil) {
		super("El CUIL '" + cuil + "' no tiene un formato válido.");
	}
}