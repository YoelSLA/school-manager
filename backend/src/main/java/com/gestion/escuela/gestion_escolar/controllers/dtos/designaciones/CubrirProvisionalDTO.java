package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CubrirProvisionalDTO(

		@NotNull(message = "El empleado es obligatorio")
		Long empleadoId,

		@NotNull(message = "La fecha de toma de posesión es obligatoria")
		LocalDate fechaTomaPosesion

) {
}

