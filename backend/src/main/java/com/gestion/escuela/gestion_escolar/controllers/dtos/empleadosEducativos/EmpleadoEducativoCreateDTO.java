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

		@Size(max = 150, message = "El domicilio no puede superar los 150 caracteres")
		String domicilio,

		@Pattern(
				regexp = "^(\\+54(9)?\\d{10})?$",
				message = "El teléfono debe estar en formato +549XXXXXXXXXX o +54XXXXXXXXXX"
		)
		String telefono,

		@NotBlank(message = "El email es obligatorio")
		@Email(message = "El email no tiene un formato válido")
		String email,

		@NotNull(message = "fechaDeNacimiento es obligatoria")
		@Past(message = "fechaDeNacimiento debe ser en el pasado")
		LocalDate fechaDeNacimiento,

		@PastOrPresent(message = "La fecha de ingreso no puede ser futura")
		LocalDate fechaDeIngreso

) {
}

