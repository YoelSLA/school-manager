package com.gestion.escuela.gestion_escolar.models.exceptions;

public class AsignacionActivaConLicenciaException extends RuntimeException {

	public AsignacionActivaConLicenciaException() {
		super("Una asignación activa no puede tener licencias activas");
	}
}

