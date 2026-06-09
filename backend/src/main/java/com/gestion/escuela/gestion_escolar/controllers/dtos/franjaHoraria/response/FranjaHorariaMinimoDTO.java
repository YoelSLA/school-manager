package com.gestion.escuela.gestion_escolar.controllers.dtos.franjaHoraria.response;

import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;

import java.time.LocalTime;

public record FranjaHorariaMinimoDTO(
		DiaDeSemana dia,
		LocalTime horaDesde,
		LocalTime horaHasta
) {
}

