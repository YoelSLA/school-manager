package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class AsignacionYaDadaDeBajaException extends GestionEscolarException {
	public AsignacionYaDadaDeBajaException() {
		super("La asignación ya fue dada de bajaAsignacion");
	}
}

