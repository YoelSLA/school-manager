package com.gestion.escuela.gestion_escolar.models.exceptions.periodo;

public class PeriodoAbiertoException extends RuntimeException {

	public PeriodoAbiertoException() {
		super("No se pueden calcular días de un período abierto");
	}
	
}