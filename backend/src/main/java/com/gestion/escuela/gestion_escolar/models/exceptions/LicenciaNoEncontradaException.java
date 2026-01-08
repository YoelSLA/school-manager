package com.gestion.escuela.gestion_escolar.models.exceptions;

public class LicenciaNoEncontradaException extends RuntimeException {

	public LicenciaNoEncontradaException(Long licenciaId) {
		super("No existe una licencia con id " + licenciaId);
	}
}
