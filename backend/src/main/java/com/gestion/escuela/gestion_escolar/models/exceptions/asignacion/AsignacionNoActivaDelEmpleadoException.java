package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class AsignacionNoActivaDelEmpleadoException extends GestionEscolarException {

	public AsignacionNoActivaDelEmpleadoException() {
		super("Todas las asignaciones de una licencia deben estar activas en la fecha de inicio del período.");
	}
}
