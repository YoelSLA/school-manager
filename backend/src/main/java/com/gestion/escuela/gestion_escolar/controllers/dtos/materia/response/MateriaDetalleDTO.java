package com.gestion.escuela.gestion_escolar.controllers.dtos.materia.response;

public record MateriaDetalleDTO(
		Long id,
		String nombre,
		String abreviatura,
		Integer cantidadModulos
) {
}
