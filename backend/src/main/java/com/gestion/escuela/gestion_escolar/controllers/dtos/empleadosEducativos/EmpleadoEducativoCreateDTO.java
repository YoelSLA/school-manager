package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
// 👉 crear empleado
public class EmpleadoEducativoCreateDTO {

	@NotBlank(message = "cuil es obligatorio")
	private String cuil;

	@NotBlank(message = "nombre es obligatorio")
	private String nombre;

	@NotBlank(message = "apellido es obligatorio")
	private String apellido;

	private String domicilio;

	private String telefono;

	@NotBlank(message = "El email es obligatorio")
	@Email(message = "El email no tiene un formato válido")
	private String email;

	@NotNull(message = "fechaDeNacimiento es obligatoria")
	@Past(message = "fechaDeNacimiento debe ser en el pasado")
	private LocalDate fechaDeNacimiento;

	@NotNull(message = "fechaDeIngreso es obligatoria")
	@PastOrPresent(message = "fechaDeIngreso debe ser en el pasado o presente")
	private LocalDate fechaDeIngreso;

}

