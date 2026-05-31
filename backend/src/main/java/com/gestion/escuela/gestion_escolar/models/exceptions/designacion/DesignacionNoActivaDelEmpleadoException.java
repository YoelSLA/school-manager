package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

import java.util.Set;

public class DesignacionNoActivaDelEmpleadoException extends GestionEscolarException {

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

		return "Las siguientes designacion no están activas: " + designaciones;
	}
}