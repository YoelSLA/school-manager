package com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PeriodoAbiertoCreateDTO(

		@NotNull(message = "La fecha desde es obligatoria")
		LocalDate fechaDesde

) implements PeriodoCreateDTO {
}
