package com.gestion.escuela.gestion_escolar.models.exceptions;

public class EmailInvalidoException extends GestionEscolarException {

	public EmailInvalidoException(String email) {
		super("El email '" + email + "' no tiene un formato válido.");
	}
	
}