package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import lombok.AllArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
// 👉 precargar formulario de edición
public class EmpleadoEducativoEditDTO {

	private Long id;

	private String nombre;
	private String apellido;
	private String domicilio;
	private String telefono;
	private String email;

	private LocalDate fechaDeNacimiento;
	private LocalDate fechaDeIngreso;
}

