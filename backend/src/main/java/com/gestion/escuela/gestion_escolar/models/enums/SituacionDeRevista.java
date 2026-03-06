package com.gestion.escuela.gestion_escolar.models.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum SituacionDeRevista {
	TITULAR("Titular"),
	SUPLENTE("Suplente"),
	PROVISIONAL("Provisional");

	private final String nombre;

	SituacionDeRevista(String nombre) {
		this.nombre = nombre;
	}

	@JsonValue
	public String getNombre() {
		return nombre;
	}
}
