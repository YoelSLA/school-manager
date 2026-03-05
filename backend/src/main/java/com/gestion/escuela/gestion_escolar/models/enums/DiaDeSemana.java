package com.gestion.escuela.gestion_escolar.models.enums;

import com.fasterxml.jackson.annotation.JsonValue;

import java.time.LocalDate;

public enum DiaDeSemana {
	LUNES("Lunes"),
	MARTES("Martes"),
	MIERCOLES("Miércoles"),
	JUEVES("Jueves"),
	VIERNES("Viernes");

	private final String nombre;

	DiaDeSemana(String nombre) {
		this.nombre = nombre;
	}

	public static DiaDeSemana from(LocalDate fecha) {

		if (fecha == null)
			return null;

		return switch (fecha.getDayOfWeek()) {
			case MONDAY ->
					LUNES;
			case TUESDAY ->
					MARTES;
			case WEDNESDAY ->
					MIERCOLES;
			case THURSDAY ->
					JUEVES;
			case FRIDAY ->
					VIERNES;
			case SATURDAY,
				 SUNDAY ->
					null; // 👈 no excepción
		};
	}

	@JsonValue
	public String getNombre() {
		return nombre;
	}
}

