package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class AsignacionSuperpuestaException extends GestionEscolarException {

	public AsignacionSuperpuestaException() {
		super("El empleadoEducativoBasico ya posee una asignación superpuesta en el período indicado.");
	}
}