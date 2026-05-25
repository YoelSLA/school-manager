package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;

import java.util.Set;

public class DesignacionNoActivaDelEmpleadoException extends RuntimeException {

	public DesignacionNoActivaDelEmpleadoException(Set<Designacion> invalidas) {
		super(crearMensaje(invalidas));
	}

	private static String crearMensaje(Set<Designacion> invalidas) {

		String designaciones = invalidas.stream()
				.map(d ->
						"CUPOF " + d.getCupof() +
								" - " + d.getRolEducativo()
				)
				.toList()
				.toString();

		return "Las siguientes designaciones no están activas: " + designaciones;
	}
}