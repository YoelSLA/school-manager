package com.gestion.escuela.gestion_escolar.models.exceptions;

public class PeriodoAsignacionInvalidoException extends RuntimeException {

	public PeriodoAsignacionInvalidoException() {
		super("La fecha de cese no puede ser anterior a la fecha de toma de posesión");
	}
}
