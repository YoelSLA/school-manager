package com.gestion.escuela.gestion_escolar.models.exceptions.licencia;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class FechaRenovacionInvalidaException extends GestionEscolarException {

	public FechaRenovacionInvalidaException(String mensaje) {
		super(mensaje);
	}
}