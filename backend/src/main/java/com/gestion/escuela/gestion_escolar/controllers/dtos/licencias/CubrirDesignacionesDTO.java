package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record CubrirDesignacionesDTO(

		@NotNull(message = "Debe seleccionar un suplente")
		Long empleadoSuplenteId,

		@NotEmpty(message = "Debe seleccionar al menos una designación")
		List<Long> designacionIds,

		@NotNull(message = "Debe indicar la fecha de inicio de la suplencia")
		LocalDate fechaInicio
) {
}
