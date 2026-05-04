package com.gestion.escuela.gestion_escolar.models.exceptions.periodo;

public class PeriodoYaCerradoException extends RuntimeException {

	private static final String MESSAGE = "No se puede cerrar un período que ya está cerrado";

	public PeriodoYaCerradoException() {
		super(MESSAGE);
	}
}
