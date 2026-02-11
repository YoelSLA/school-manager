package com.gestion.escuela.gestion_escolar.controllers.dtos.materias;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MateriaCreateDTO(
		@NotBlank(message = "El nombre es obligatorio")
		String nombre,

		@NotBlank(message = "La abreviatura es obligatoria")
		String abreviatura,

		@NotNull(message = "La cantidad de módulos es obligatoria")
		@Min(value = 1, message = "La materia debe tener al menos un módulo")
		Integer cantidadModulos
) {
}