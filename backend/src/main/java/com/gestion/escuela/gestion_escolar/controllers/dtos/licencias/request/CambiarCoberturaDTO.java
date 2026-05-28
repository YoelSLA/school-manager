package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record CambiarCoberturaDTO(

		@NotNull(message = "Debe seleccionar un suplente")
		Long empleadoId,

		@NotNull(message = "Debe indicar la fecha de toma de posesión para la suplencia")
		LocalDate fechaTomaPosesion,

		@NotNull(message = "Debe indicar la secuencia")
		@Positive(message = "La secuencia debe ser mayor a 0")
		Integer secuencia

) {
}
