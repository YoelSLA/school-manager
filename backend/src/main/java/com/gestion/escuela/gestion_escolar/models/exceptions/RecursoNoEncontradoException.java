package com.gestion.escuela.gestion_escolar.models.exceptions;

public class RecursoNoEncontradoException extends GestionEscolarException {

	public RecursoNoEncontradoException(
			String recurso,
			Object identificador
	) {
		super(recurso + " con identificador " + identificador + " no existe");
	}
}
