package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record EmpleadoEducativoCreateDTO(

		@NotBlank(message = "cuil es obligatorio")
		String cuil,

		@NotBlank(message = "nombre es obligatorio")
		String nombre,

		@NotBlank(message = "apellido es obligatorio")
		String apellido,

		String domicilio,

		String telefono,

		@NotBlank(message = "El email es obligatorio")
		@Email(message = "El email no tiene un formato válido")
		String email,

		@NotNull(message = "fechaDeNacimiento es obligatoria")
		@Past(message = "fechaDeNacimiento debe ser en el pasado")
		LocalDate fechaDeNacimiento,

		@NotNull(message = "fechaDeIngreso es obligatoria")
		@PastOrPresent(message = "fechaDeIngreso debe ser en el pasado o presente")
		LocalDate fechaDeIngreso

) {
}

