package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones;

import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.enums.TipoAsignacion;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record AsignacionCreateDTO(
		@NotNull
		Long empleadoId,

		@NotNull
		SituacionDeRevista situacionDeRevista,

		@NotNull
		TipoAsignacion tipoAsignacion,

		@NotNull
		LocalDate fechaTomaPosesion,

		@NotNull
		LocalDate fechaCese
) {
}