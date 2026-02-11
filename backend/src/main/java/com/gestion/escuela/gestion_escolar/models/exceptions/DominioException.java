package com.gestion.escuela.gestion_escolar.models.exceptions;

public abstract class DominioException extends RuntimeException {
	public DominioException(String message) {
		super(message);
	}
}
