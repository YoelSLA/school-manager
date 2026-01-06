package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
// 👉 ver entidad (pantalla detalle)
public class EmpleadoEducativoDetalleDTO {

	private Long id;
	private String cuil;
	private String nombre;
	private String apellido;

	private String domicilio;
	private String telefono;
	private String email;

	private LocalDate fechaDeNacimiento;
	private LocalDate fechaDeIngreso;

	private boolean activo;

	// cosas solo de lectura
	// private List<AsignacionDetalleDTO> asignaciones;
	// private List<LicenciaDetalleDTO> licencias;
}
