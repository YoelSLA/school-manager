package com.gestion.escuela.gestion_escolar.controllers.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PeriodoCreateDTO(

		@NotNull(message = "La fecha desde es obligatoria")
		LocalDate fechaDesde,
		LocalDate fechaHasta
) {

}