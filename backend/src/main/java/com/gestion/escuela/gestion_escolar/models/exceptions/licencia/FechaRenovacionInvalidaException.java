package com.gestion.escuela.gestion_escolar.models.exceptions.licencia;

public class FechaRenovacionInvalidaException extends RuntimeException {

	public FechaRenovacionInvalidaException(String mensaje) {
		super(mensaje);
	}
}