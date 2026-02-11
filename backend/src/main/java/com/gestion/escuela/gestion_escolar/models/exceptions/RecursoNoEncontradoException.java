package com.gestion.escuela.gestion_escolar.models.exceptions;

public class RecursoNoEncontradoException extends DominioException {
	public RecursoNoEncontradoException(String recurso, Long id) {
		super(recurso + " con id " + id + " no existe");
	}
}

