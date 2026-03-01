package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CubrirProvisionalDTO(

		@NotNull(message = "El empleado es obligatorio")
		Long empleadoId,

		@NotNull(message = "La fecha de inicio es obligatoria")
		LocalDate fechaInicio,

		@NotNull(message = "La fecha fin es obligatoria")
		LocalDate fechaFin

) {
}
