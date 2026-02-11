package com.gestion.escuela.gestion_escolar.controllers.dtos.materias;

public record MateriaResponseDTO(
		Long id,
		String nombre,
		String abreviatura,
		Integer modulos
) {
}
