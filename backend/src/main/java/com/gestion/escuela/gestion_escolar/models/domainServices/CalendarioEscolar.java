package com.gestion.escuela.gestion_escolar.models.domainServices;

import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;

import java.time.DayOfWeek;
import java.time.LocalDate;

public class CalendarioEscolar {

	private CalendarioEscolar() {
	}

	/**
	 * Retorna el inicio del próximo ciclo lectivo.
	 *
	 * Ejemplo:
	 * 2025-10-10 -> 2026-03-01
	 * 2025-01-10 -> 2025-03-01
	 */
	public static LocalDate inicioCicloLectivoSiguiente(
			LocalDate fecha
	) {

		Validaciones.noNulo(fecha, "fecha");

		int anioInicio =
				fecha.getMonthValue() >= 3
						? fecha.getYear() + 1
						: fecha.getYear();

		return LocalDate.of(anioInicio, 3, 1);
	}

	/**
	 * Retorna el inicio del ciclo lectivo correspondiente
	 * a la fecha recibida.
	 *
	 * Ejemplo:
	 * 2025-10-10 -> 2025-03-01
	 * 2025-01-10 -> 2024-03-01
	 */
	public static LocalDate inicioCicloLectivo(
			LocalDate fecha
	) {

		Validaciones.noNulo(fecha, "fecha");

		int anioInicio =
				fecha.getMonthValue() >= 3
						? fecha.getYear()
						: fecha.getYear() - 1;

		return LocalDate.of(anioInicio, 3, 1);
	}

	/**
	 * Retorna el último día hábil de febrero
	 * del siguiente año.
	 *
	 * Ejemplo:
	 * 2025-03-01 -> 2026-02-27
	 */
	public static LocalDate ultimoDiaHabilDeFebreroSiguiente(
			LocalDate fecha
	) {

		Validaciones.noNulo(fecha, "fecha");

		int anioSiguiente =
				fecha.getYear() + 1;

		LocalDate ultimoDiaFebrero =
				LocalDate.of(anioSiguiente, 2, 1)
						.withDayOfMonth(
								LocalDate.of(anioSiguiente, 2, 1)
										.lengthOfMonth()
						);

		while (esFinDeSemana(ultimoDiaFebrero)) {
			ultimoDiaFebrero =
					ultimoDiaFebrero.minusDays(1);
		}

		return ultimoDiaFebrero;
	}

	/**
	 * Crea automáticamente un período provisional
	 * desde una fecha dada hasta el último día hábil
	 * de febrero siguiente.
	 */
	public static Periodo periodoProvisionalAutomaticoDesde(
			LocalDate fechaInicio
	) {

		Validaciones.noNulo(
				fechaInicio,
				"fecha inicio"
		);

		return Periodo.cerrado(
				fechaInicio,
				ultimoDiaHabilDeFebreroSiguiente(
						fechaInicio
				)
		);
	}

	/**
	 * Indica si una fecha corresponde
	 * al inicio de ciclo lectivo.
	 */
	public static boolean esInicioCicloLectivo(
			LocalDate fecha
	) {

		Validaciones.noNulo(fecha, "fecha");

		return fecha.getMonthValue() == 3
				&& fecha.getDayOfMonth() == 1;
	}

	/**
	 * Determina si dos fechas pertenecen
	 * al mismo ciclo lectivo.
	 */
	public static boolean perteneceAlMismoCicloLectivo(
			LocalDate fecha1,
			LocalDate fecha2
	) {

		Validaciones.noNulo(fecha1, "fecha1");
		Validaciones.noNulo(fecha2, "fecha2");

		return inicioCicloLectivo(fecha1)
				.equals(inicioCicloLectivo(fecha2));
	}

	/**
	 * Determina si una fecha cae
	 * en fin de semana.
	 */
	public static boolean esFinDeSemana(
			LocalDate fecha
	) {

		Validaciones.noNulo(fecha, "fecha");

		DayOfWeek dia = fecha.getDayOfWeek();

		return dia == DayOfWeek.SATURDAY
				|| dia == DayOfWeek.SUNDAY;
	}
}