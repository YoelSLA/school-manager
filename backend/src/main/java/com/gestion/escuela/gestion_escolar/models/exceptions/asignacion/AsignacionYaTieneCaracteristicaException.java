package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

public class AsignacionYaTieneCaracteristicaException extends RuntimeException {
	public AsignacionYaTieneCaracteristicaException() {
		super("La asignación ya tiene una característica");
	}
}

