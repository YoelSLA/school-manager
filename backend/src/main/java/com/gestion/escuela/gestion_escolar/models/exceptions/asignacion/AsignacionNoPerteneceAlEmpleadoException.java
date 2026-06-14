package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class AsignacionNoPerteneceAlEmpleadoException extends GestionEscolarException {

	public AsignacionNoPerteneceAlEmpleadoException() {
		super("Las asignaciones indicadas no pertenecen al empleado.");
	}

}
