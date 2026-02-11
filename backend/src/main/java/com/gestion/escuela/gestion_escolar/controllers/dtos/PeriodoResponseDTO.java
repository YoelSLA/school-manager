package com.gestion.escuela.gestion_escolar.controllers.dtos;

import java.time.LocalDate;

public record PeriodoResponseDTO(
		LocalDate fechaDesde,
		LocalDate fechaHasta,
		Integer dias
) {
}