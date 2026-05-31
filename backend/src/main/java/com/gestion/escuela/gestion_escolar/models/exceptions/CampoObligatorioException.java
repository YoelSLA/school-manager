package com.gestion.escuela.gestion_escolar.models.exceptions;

public class CampoObligatorioException extends GestionEscolarException {

	public CampoObligatorioException(String campo) {
		super("El campo '" + campo + "' es obligatorio");
	}

}