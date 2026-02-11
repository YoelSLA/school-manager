package com.gestion.escuela.gestion_escolar.controllers.dtos.cursos;

import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CursoCreateDTO(

		@NotNull(message = "El turno es obligatorio")
		Turno turno,
		
		@NotNull(message = "El año es obligatorio")
		@Min(value = 1, message = "El año debe ser mayor o igual a 1")
		Integer anio,

		@NotNull(message = "El grado es obligatorio")
		@Min(value = 1, message = "El grado debe ser mayor o igual a 1")
		Integer grado
) {
}