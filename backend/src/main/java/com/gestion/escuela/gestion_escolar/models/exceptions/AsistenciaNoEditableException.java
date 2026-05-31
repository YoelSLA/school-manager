package com.gestion.escuela.gestion_escolar.models.exceptions;

import java.time.LocalDate;

public class AsistenciaNoEditableException extends GestionEscolarException {

	public AsistenciaNoEditableException(LocalDate fecha) {
		super("La asistencia del día " + fecha + " no puede ser eliminada.");
	}
}
