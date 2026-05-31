package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class DesignacionYaCubiertaException extends GestionEscolarException {

	public DesignacionYaCubiertaException(Designacion designacion) {
		super("La designación CUPOF " +
				designacion.getCupof() +
				" (" + designacion.getRolEducativo() +
				") ya se encuentra cubierta");
	}
}
