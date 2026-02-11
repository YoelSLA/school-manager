package com.gestion.escuela.gestion_escolar.models.exceptions.licencia;

public class LicenciaSuperpuestaException extends RuntimeException {

	public LicenciaSuperpuestaException() {
		super("El empleado ya posee una licencia que se superpone con el período indicado");
	}
}
