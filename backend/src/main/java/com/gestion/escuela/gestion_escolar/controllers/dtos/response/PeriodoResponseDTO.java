package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import java.time.LocalDate;

public record PeriodoResponseDTO(
		LocalDate fechaDesde,
		LocalDate fechaHasta,
		Integer dias
) {
}