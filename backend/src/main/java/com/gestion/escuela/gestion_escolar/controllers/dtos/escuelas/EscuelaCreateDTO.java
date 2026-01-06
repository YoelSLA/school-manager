package com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EscuelaCreateDTO {

	@NotBlank(message = "El nombre de la escuela es obligatorio")
	private String nombre;

	@NotBlank(message = "El nombre de la escuela es obligatorio")
	private String localidad;

	private String direccion;

	private String telefono;

}
