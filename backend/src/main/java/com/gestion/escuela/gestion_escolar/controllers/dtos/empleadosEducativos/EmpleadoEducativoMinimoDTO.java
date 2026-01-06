package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
// 👉 selects / referencias / autocompletes
public class EmpleadoEducativoMinimoDTO {
	private Long id;
	private String cuil, nombre, apellido;

}