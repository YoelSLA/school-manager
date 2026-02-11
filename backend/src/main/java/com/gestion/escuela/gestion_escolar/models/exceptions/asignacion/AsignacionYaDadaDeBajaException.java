package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

public class AsignacionYaDadaDeBajaException extends RuntimeException {
	public AsignacionYaDadaDeBajaException() {
		super("La asignación ya fue dada de baja");
	}
}

