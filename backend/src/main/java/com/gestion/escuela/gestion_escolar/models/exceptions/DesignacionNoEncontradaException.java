package com.gestion.escuela.gestion_escolar.models.exceptions;

public class DesignacionNoEncontradaException extends RuntimeException {

	public DesignacionNoEncontradaException(Long id) {
		super("No existe la designación con id " + id);
	}
}
