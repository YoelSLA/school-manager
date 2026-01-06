package com.gestion.escuela.gestion_escolar.models.exceptions;

public class RangoFechasLicenciaInvalidoException extends RuntimeException {

	public RangoFechasLicenciaInvalidoException() {
		super("La fecha desde no puede ser posterior a la fecha hasta");
	}
}
