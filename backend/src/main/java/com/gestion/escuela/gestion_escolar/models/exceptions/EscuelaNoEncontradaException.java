package com.gestion.escuela.gestion_escolar.models.exceptions;

public class EscuelaNoEncontradaException extends RuntimeException {

	public EscuelaNoEncontradaException(Long id) {
		super("No existe una escuela con el nombre: " + id);
	}
}
