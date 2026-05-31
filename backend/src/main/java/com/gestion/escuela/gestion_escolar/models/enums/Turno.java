package com.gestion.escuela.gestion_escolar.models.enums;

public enum Turno {

	MANIANA("Mañana"),
	TARDE("Tarde"),
	VESPERTINO("Vespertino");

	private final String nombre;

	Turno(String nombre) {
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}
}
