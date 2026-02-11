package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
// 👉 actualizar empleado
public class EmpleadoEducativoUpdateDTO {

	@NotBlank(message = "El nombre es obligatorio")
	private String nombre;

	@NotBlank(message = "El apellido es obligatorio")
	private String apellido;

	@NotBlank(message = "El CUIL es obligatorio")
	@Pattern(
			regexp = "\\d{2}-\\d{8}-\\d",
			message = "El CUIL debe tener el formato XX-XXXXXXXX-X"
	)
	private String cuil;

	@NotBlank(message = "El domicilio es obligatorio")
	private String domicilio;

	@NotNull(message = "La fecha de nacimiento es obligatoria")
	@Past(message = "La fecha de nacimiento debe ser pasada")
	private LocalDate fechaDeNacimiento;

	@NotNull(message = "La fecha de ingreso es obligatoria")
	@PastOrPresent(message = "La fecha de ingreso no puede ser futura")
	private LocalDate fechaDeIngreso;

	private String telefono;

	private String email;

}
