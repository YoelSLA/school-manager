package com.gestion.escuela.gestion_escolar.models.exceptions;

public class TipoLicenciaObligatorioException extends RuntimeException {

	public TipoLicenciaObligatorioException() {
		super("El tipo de licencia es obligatorio");
	}
}
