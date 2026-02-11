package com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EscuelaUpdateDTO {

	@NotBlank(message = "El nombre es obligatorio")
	private String nombre;

	@NotBlank(message = "La dirección es obligatoria")
	private String direccion;

	@NotBlank(message = "El teléfono es obligatorio")
	private String telefono;
}

