package com.gestion.escuela.gestion_escolar.controllers.dtos.horarios;

import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;

import java.time.LocalTime;

public record FranjaHorariaMinimoDTO(

		DiaDeSemana dia,
		LocalTime horaDesde,
		LocalTime horaHasta

) {
}

