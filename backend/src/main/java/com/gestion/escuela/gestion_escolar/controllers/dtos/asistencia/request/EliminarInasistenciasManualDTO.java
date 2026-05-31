package com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.util.List;

public record EliminarInasistenciasManualDTO(

		@NotNull(message = "El empleadoId es obligatorio")
		@Positive(message = "El empleadoId debe ser positivo")
		Long empleadoId,

		@NotNull(message = "Las fechas son obligatorias")
		@NotEmpty(message = "Debe indicar al menos una fecha")
		List<@NotNull(message = "La fecha no puede ser nula") LocalDate> fechas

) {
}
