package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

public class AsignacionSuperpuestaException extends RuntimeException {

	public AsignacionSuperpuestaException() {
		super("El empleado ya posee una asignación superpuesta en el período indicado.");
	}
}