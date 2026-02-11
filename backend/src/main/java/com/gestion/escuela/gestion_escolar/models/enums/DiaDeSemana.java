package com.gestion.escuela.gestion_escolar.models.enums;

import java.time.LocalDate;

public enum DiaDeSemana {
	LUNES,
	MARTES,
	MIERCOLES,
	JUEVES,
	VIERNES;

	public static DiaDeSemana from(LocalDate fecha) {
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
			default ->
					throw new IllegalArgumentException(
							"No es un día laboral: " + fecha.getDayOfWeek()
					);
		};
	}
}

