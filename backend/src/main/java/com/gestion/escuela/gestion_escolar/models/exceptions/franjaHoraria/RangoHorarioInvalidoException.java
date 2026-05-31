package com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

import java.time.LocalTime;

public class RangoHorarioInvalidoException extends GestionEscolarException {

	public RangoHorarioInvalidoException(LocalTime desde, LocalTime hasta) {
		super(String.format(
				"Rango horario inválido: horaDesde (%s) debe ser anterior a horaHasta (%s)",
				desde,
				hasta
		));
	}
}