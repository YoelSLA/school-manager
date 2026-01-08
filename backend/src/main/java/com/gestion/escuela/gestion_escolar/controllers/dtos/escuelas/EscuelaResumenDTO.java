package com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas;

public record EscuelaResumenDTO(

		Long id,
		String nombre,
		String localidad,
		String direccion,
		String telefono
) {
}
