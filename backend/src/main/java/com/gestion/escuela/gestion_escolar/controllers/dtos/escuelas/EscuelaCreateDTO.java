package com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas;

import jakarta.validation.constraints.NotBlank;

public record EscuelaCreateDTO(

		@NotBlank(message = "El nombre de la escuela es obligatorio")
		String nombre,

		@NotBlank(message = "El nombre de la escuela es obligatorio")
		String localidad,

		String direccion,

		String telefono

) {
}
