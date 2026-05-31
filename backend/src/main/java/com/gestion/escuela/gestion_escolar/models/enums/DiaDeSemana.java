package com.gestion.escuela.gestion_escolar.models.enums;

import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;

import java.time.LocalDate;

public enum DiaDeSemana {

	LUNES("Lunes"),
	MARTES("Martes"),
	MIERCOLES("Miércoles"),
	JUEVES("Jueves"),
	VIERNES("Viernes"),
	SABADO("Sábado"),
	DOMINGO("Domingo");

	private final String nombre;

	DiaDeSemana(String nombre) {
		this.nombre = nombre;
	}

	public static DiaDeSemana from(LocalDate fecha) {

		Validaciones.noNulo(fecha, "fecha");

		return switch (fecha.getDayOfWeek()) {
			case MONDAY -> LUNES;
			case TUESDAY -> MARTES;
			case WEDNESDAY -> MIERCOLES;
			case THURSDAY -> JUEVES;
			case FRIDAY -> VIERNES;
			case SATURDAY -> SABADO;
			case SUNDAY -> DOMINGO;
		};
	}

	public boolean esLaborable() {
		return this != SABADO && this != DOMINGO;
	}

	public String getNombre() {
		return nombre;
	}
}