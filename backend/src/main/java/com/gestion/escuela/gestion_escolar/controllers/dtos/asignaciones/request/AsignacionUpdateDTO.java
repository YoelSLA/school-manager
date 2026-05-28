package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AsignacionUpdateDTO(
		@NotNull(message = "El empleado es obligatorio")
		Long empleadoId,
		@NotNull(message = "La fecha de toma de posesión es obligatoria")
		LocalDate fechaTomaPosesion,
		LocalDate fechaCese,
		Integer secuencia
) {
}