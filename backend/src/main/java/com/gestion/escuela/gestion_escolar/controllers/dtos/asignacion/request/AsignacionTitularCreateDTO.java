package com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record AsignacionTitularCreateDTO(

		@NotNull(message = "El id del empleadoEducativoBasico es obligatorio")
		Long empleadoId,

		@NotNull(message = "La fecha de toma de posesión es obligatoria")
		LocalDate fechaTomaPosesion,

		@Positive(message = "La secuencia debe ser mayor a 0")
		Integer secuencia
) {
}
