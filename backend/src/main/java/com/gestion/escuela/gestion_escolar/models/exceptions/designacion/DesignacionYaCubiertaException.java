package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

public class DesignacionYaCubiertaException extends RuntimeException {

	public DesignacionYaCubiertaException(Long cupof) {
		super("La designación " + cupof + " ya se encuentra cubierta");
	}
}
