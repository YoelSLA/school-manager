package com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class EmpleadoNoPerteneceAEscuelaException extends GestionEscolarException {

	public EmpleadoNoPerteneceAEscuelaException(Long empleadoId, Long escuelaId) {
		super("El empleadoEducativoBasico con id " + empleadoId +
				" no pertenece a la escuela con id " + escuelaId);
	}
}

