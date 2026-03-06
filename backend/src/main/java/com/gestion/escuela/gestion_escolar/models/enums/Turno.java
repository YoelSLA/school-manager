package com.gestion.escuela.gestion_escolar.models.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Turno {

	MANIANA("Mañana"),
	TARDE("Tarde"),
	VESPERTINO("Vespertino");

	private final String nombre;

	Turno(String nombre) {
		this.nombre = nombre;
	}

	@JsonValue
	public String getNombre() {
		return nombre;
	}
}
