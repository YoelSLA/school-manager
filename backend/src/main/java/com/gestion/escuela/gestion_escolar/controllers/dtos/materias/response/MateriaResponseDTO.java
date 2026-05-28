package com.gestion.escuela.gestion_escolar.controllers.dtos.materias.response;

public record MateriaResponseDTO(
		Long id,
		String nombre,
		String abreviatura,
		Integer cantidadModulos
) {
}
