package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;

public class DesignacionYaCubiertaException extends RuntimeException {

	public DesignacionYaCubiertaException(Designacion designacion) {
		super("La designación CUPOF " +
				designacion.getCupof() +
				" (" + designacion.getRolEducativo() +
				") ya se encuentra cubierta");
	}
}
