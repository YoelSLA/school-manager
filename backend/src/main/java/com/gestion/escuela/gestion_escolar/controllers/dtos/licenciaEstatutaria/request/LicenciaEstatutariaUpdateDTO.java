package com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LicenciaEstatutariaUpdateDTO(
		@Size(max = 20, message = "El artículo no puede superar los 20 caracteres") String articulo,
		@NotBlank(message = "El código es obligatorio")
		@Size(max = 30, message = "El código no puede superar los 30 caracteres")
		String codigo,
		@NotBlank(message = "El nombre es obligatorio")
		@Size(max = 150, message = "El nombre no puede superar los 150 caracteres")
		String nombre,
		@NotBlank(message = "La descripción es obligatoria")
		@Size(max = 2000, message = "La descripción no puede superar los 2000 caracteres")
		String descripcion) {}

