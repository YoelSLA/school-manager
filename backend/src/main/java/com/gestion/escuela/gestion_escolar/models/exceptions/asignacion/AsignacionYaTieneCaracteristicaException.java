package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class AsignacionYaTieneCaracteristicaException extends GestionEscolarException {
	public AsignacionYaTieneCaracteristicaException() {
		super("La asignación ya tiene una característica");
	}
}

