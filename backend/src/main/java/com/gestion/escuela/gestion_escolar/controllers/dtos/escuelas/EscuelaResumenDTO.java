package com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EscuelaResumenDTO {

	private Long id;
	private String nombre;
	private String localidad;
	private String direccion;
	private String telefono;
}
