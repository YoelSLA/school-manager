package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
// 👉 listados / cards / tablas
public class EmpleadoEducativoResumenDTO {

	private Long id;
	private String cuil, nombre, apellido;
	private LocalDate fechaDeIngreso;
	private boolean activo;

	// si después lo enriquecés
	// private List<RolResumenDTO> roles;
}
