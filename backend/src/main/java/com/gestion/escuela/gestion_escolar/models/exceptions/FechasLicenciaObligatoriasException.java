package com.gestion.escuela.gestion_escolar.models.exceptions;

public class FechasLicenciaObligatoriasException extends RuntimeException {

	public FechasLicenciaObligatoriasException() {
		super("Las fechas de la licencia son obligatorias");
	}
}
