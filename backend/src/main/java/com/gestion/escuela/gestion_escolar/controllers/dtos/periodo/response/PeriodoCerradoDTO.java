package com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response;

import java.time.LocalDate;

public record PeriodoCerradoDTO(
		LocalDate fechaDesde,
		LocalDate fechaHasta,
		Integer dias
) implements PeriodoDTO {
}
