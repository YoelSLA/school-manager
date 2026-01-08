package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import java.time.LocalDate;

public record CubrirDesignacionDTO(
		Long empleadoSuplenteId,
		LocalDate fechaDesde,
		LocalDate fechaHasta
) {
}
