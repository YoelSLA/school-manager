package com.gestion.escuela.gestion_escolar.models.enums;

import java.time.LocalDate;

public enum DiaDeSemana {
	LUNES,
	MARTES,
	MIERCOLES,
	JUEVES,
	VIERNES;

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
}

