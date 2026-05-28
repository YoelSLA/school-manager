package com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.response;

public record EscuelaResumenDTO(

		Long id,
		String nombre,
		String localidad,
		String direccion,
		String telefono
) {
}
