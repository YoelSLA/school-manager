package com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class EmpleadoInactivoException extends GestionEscolarException {

	public EmpleadoInactivoException(EmpleadoEducativo empleado) {
		super(
				"El empleadoEducativoBasico %s %s (CUIL: %s) se encuentra inactivo"
						.formatted(
								empleado.getApellido(),
								empleado.getNombre(),
								empleado.getCuil()
						)
		);
	}
}
