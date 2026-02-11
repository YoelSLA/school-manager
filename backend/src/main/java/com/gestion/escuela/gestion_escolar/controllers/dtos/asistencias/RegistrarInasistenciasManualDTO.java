package com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias;

import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record RegistrarInasistenciasManualDTO(

		@NotNull(message = "El empleado es obligatorio")
		Long empleadoId,

		@NotEmpty(message = "Debe seleccionar al menos una fecha")
		@Size(max = 31, message = "No se pueden registrar más de 31 días a la vez")
		List<@NotNull(message = "La fecha no puede ser nula") LocalDate> fechas,

		@NotNull(message = "Debe indicar el tipo de licencia")
		TipoLicencia tipoLicencia,

		@Size(max = 255, message = "La observación no puede superar los 255 caracteres")
		String observacion

) {
}
