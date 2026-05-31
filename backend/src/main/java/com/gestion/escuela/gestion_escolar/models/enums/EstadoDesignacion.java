package com.gestion.escuela.gestion_escolar.models.enums;

public enum EstadoDesignacion {

	CUBIERTA("Cubierta"),
	VACANTE("Vacante");

	private final String descripcion;

	EstadoDesignacion(String descripcion) {
		this.descripcion = descripcion;
	}

	public static EstadoDesignacion desdeCobertura(boolean cubierta) {
		return cubierta ? CUBIERTA : VACANTE;
	}

	public String getDescripcion() {
		return descripcion;
	}
}