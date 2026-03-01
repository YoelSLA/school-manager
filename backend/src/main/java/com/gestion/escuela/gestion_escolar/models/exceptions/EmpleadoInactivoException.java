package com.gestion.escuela.gestion_escolar.models.exceptions;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;

public class EmpleadoInactivoException extends RuntimeException {

	public EmpleadoInactivoException(EmpleadoEducativo empleado) {
		super(
				"El empleado %s %s (CUIL: %s) se encuentra inactivo"
						.formatted(
								empleado.getApellido(),
								empleado.getNombre(),
								empleado.getCuil()
						)
		);
	}
}
