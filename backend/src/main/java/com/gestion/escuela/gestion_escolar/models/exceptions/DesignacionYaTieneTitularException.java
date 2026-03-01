package com.gestion.escuela.gestion_escolar.models.exceptions;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;

public class DesignacionYaTieneTitularException extends RuntimeException {

	public DesignacionYaTieneTitularException(Designacion designacion) {
		super(
				"La designación CUPOF " +
						designacion.getCupof() +
						" (" + designacion.getRolEducativo() +
						") ya tiene un titular activo"
		);
	}
}