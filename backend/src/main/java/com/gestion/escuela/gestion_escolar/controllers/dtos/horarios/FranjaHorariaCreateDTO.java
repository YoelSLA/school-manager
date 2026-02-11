package com.gestion.escuela.gestion_escolar.controllers.dtos.horarios;

import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import jakarta.validation.constraints.NotNull;

import java.time.LocalTime;

public record FranjaHorariaCreateDTO(
		@NotNull
		DiaDeSemana dia,

		@NotNull
		LocalTime horaDesde,

		@NotNull
		LocalTime horaHasta
) {
}