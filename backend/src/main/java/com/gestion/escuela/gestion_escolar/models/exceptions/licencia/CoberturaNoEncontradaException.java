package com.gestion.escuela.gestion_escolar.models.exceptions.licencia;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class CoberturaNoEncontradaException extends GestionEscolarException {

	public CoberturaNoEncontradaException(Designacion designacion) {
		super(String.format(
				"La designación %d no tiene una cobertura activa",
				designacion.getId()
		));
	}
}
