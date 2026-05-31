package com.gestion.escuela.gestion_escolar.models.exceptions.periodo;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class PeriodoAbiertoException extends GestionEscolarException {

	public PeriodoAbiertoException() {
		super("El período se encuentra abierto.");
	}

	public PeriodoAbiertoException(String mensaje) {
		super(mensaje);
	}
}