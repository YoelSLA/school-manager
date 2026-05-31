package com.gestion.escuela.gestion_escolar.models.exceptions;

public class CuilInvalidoException extends GestionEscolarException {

	public CuilInvalidoException(String cuil) {
		super("El CUIL '" + cuil + "' no tiene un formato válido.");
	}
}