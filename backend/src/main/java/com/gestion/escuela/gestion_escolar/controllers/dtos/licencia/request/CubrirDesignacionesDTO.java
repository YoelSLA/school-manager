package com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record CubrirDesignacionesDTO(

		@NotNull(message = "Debe seleccionar un suplente")
		Long empleadoId,

		@NotEmpty(message = "Debe seleccionar al menos una designación para cubrir")
		List<Long> designacionesIds,

		@NotNull(message = "Debe indicar la fecha de toma de posesión para la suplencia")
		LocalDate fechaTomaPosesion,

		Integer secuencia
) {
}
