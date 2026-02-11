package com.gestion.escuela.gestion_escolar.models.exceptions;

public class RecursoDuplicadoException extends RuntimeException {

	public RecursoDuplicadoException(
			String recurso,
			String campo,
			String valor,
			String contexto
	) {
		super(
				"Ya existe un " + recurso +
						" con " + campo +
						" '" + valor +
						"' en " + contexto
		);
	}
}

