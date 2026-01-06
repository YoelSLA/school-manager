package com.gestion.escuela.gestion_escolar.models.exceptions;

public class CambioDeFuncionSoloTitularException extends RuntimeException {

	public CambioDeFuncionSoloTitularException() {
		super("El cambio de función solo aplica a asignaciones titulares");
	}
}
