package com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria;

import java.time.LocalTime;

public class RangoHorarioInvalidoException extends RuntimeException {

	public RangoHorarioInvalidoException(LocalTime desde, LocalTime hasta) {
		super(String.format(
				"Rango horario inválido: horaDesde (%s) debe ser anterior a horaHasta (%s)",
				desde,
				hasta
		));
	}
}