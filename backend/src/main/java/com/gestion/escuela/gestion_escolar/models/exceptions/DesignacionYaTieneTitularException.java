package com.gestion.escuela.gestion_escolar.models.exceptions;

public class DesignacionYaTieneTitularException extends RuntimeException {

	public DesignacionYaTieneTitularException(Long designacionId) {
		super(mensaje(designacionId));
	}

	private static String mensaje(Long designacionId) {
		if (designacionId == null) {
			return "La designación ya tiene un titular activo";
		}
		return "La designación con id " + designacionId + " ya tiene un titular activo";
	}
}