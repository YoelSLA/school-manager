package com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PeriodoCerradoCreateDTO(

		@NotNull(message = "La fecha desde es obligatoria")
		LocalDate fechaDesde,

		@NotNull(message = "La fecha hasta es obligatoria")
		LocalDate fechaHasta

) implements PeriodoCreateDTO {
}
