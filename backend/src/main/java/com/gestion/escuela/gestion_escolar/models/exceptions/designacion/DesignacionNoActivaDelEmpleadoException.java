package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;

import java.util.Set;

public class DesignacionNoActivaDelEmpleadoException extends RuntimeException {

	public DesignacionNoActivaDelEmpleadoException(Set<Designacion> invalidas) {
		super("Las siguientes designaciones no están activas para el empleado: " + invalidas);
	}
}
