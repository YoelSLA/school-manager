package com.gestion.escuela.gestion_escolar.models.exceptions;

import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

public class AsignacionVigenteInexistenteException extends RuntimeException {

	public AsignacionVigenteInexistenteException(SituacionDeRevista situacion) {
		super("No existe una asignación vigente para la jerarquía " + situacion);
	}
}

