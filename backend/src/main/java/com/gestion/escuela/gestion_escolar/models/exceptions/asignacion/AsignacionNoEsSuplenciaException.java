package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;

public class AsignacionNoEsSuplenciaException extends RuntimeException {

	public AsignacionNoEsSuplenciaException(Asignacion asignacion) {
		super(String.format(
				"La asignación %d no corresponde a una suplencia",
				asignacion.getId()
		));
	}
}