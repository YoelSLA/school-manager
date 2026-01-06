package com.gestion.escuela.gestion_escolar.models.exceptions;

public class EscuelaObligatoriaException extends RuntimeException {

	public EscuelaObligatoriaException() {
		super("La escuela es obligatoria para crear un empleado educativo");
	}
}

