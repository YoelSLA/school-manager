package com.gestion.escuela.gestion_escolar.models.enums;

public enum SituacionDeRevista {
	TITULAR("Titular"),
	SUPLENTE("Suplente"),
	PROVISIONAL("Provisional");

	private final String nombre;

	SituacionDeRevista(String nombre) {
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}
}
