package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record EmpleadoEducativoUpdateDTO(

		@NotBlank(message = "El CUIL es obligatorio")
		@Pattern(
				regexp = "\\d{2}-\\d{8}-\\d",
				message = "El CUIL debe tener el formato XX-XXXXXXXX-X"
		)
		String cuil,

		@NotBlank(message = "El nombre es obligatorio")
		String nombre,

		@NotBlank(message = "El apellido es obligatorio")
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

		@NotNull(message = "La fecha de nacimiento es obligatoria")
		@Past(message = "La fecha de nacimiento debe ser pasada")
		LocalDate fechaDeNacimiento,

		@PastOrPresent(message = "La fecha de ingreso no puede ser futura")
		LocalDate fechaDeIngreso

) {
}
