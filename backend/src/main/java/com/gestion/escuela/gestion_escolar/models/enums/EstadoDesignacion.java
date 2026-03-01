package com.gestion.escuela.gestion_escolar.models.enums;

public enum EstadoDesignacion {
	CUBIERTA,
	VACANTE;

	public static EstadoDesignacion desde(boolean cubierta) {
		return cubierta ? CUBIERTA : VACANTE;
	}
}