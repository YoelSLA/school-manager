package com.gestion.escuela.gestion_escolar.models.exceptions;

public class AsignacionEnLicenciaSinLicenciasException extends RuntimeException {

	public AsignacionEnLicenciaSinLicenciasException() {
		super("Una asignación en licencia debe tener al menos una licencia");
	}
}

