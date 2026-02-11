package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AsignacionCreateDTO(
		@NotNull
		Long empleadoId,

		@NotNull
		LocalDate fechaTomaPosesion,

		@NotNull
		LocalDate fechaCese
) {
}