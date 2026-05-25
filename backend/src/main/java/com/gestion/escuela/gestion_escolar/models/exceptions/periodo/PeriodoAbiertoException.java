package com.gestion.escuela.gestion_escolar.models.exceptions.periodo;

public class PeriodoAbiertoException extends RuntimeException {

	public PeriodoAbiertoException() {
		super("El período se encuentra abierto.");
	}

	public PeriodoAbiertoException(String mensaje) {
		super(mensaje);
	}
}