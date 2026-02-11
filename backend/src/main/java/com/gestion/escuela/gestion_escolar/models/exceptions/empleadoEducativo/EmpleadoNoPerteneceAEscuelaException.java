package com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo;

public class EmpleadoNoPerteneceAEscuelaException extends RuntimeException {

	public EmpleadoNoPerteneceAEscuelaException(Long empleadoId, Long escuelaId) {
		super("El empleado con id " + empleadoId +
				" no pertenece a la escuela con id " + escuelaId);
	}
}

