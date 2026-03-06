package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CubrirProvisionalDTO(

		@NotNull(message = "El empleado es obligatorio")
		Long empleadoId,

		@NotNull(message = "La fecha de toma posesion es obligatoria")
		LocalDate fechaTomaPosesion,

		@NotNull(message = "La fecha de cese es obligatoria")
		LocalDate fechaCese

) {
}
