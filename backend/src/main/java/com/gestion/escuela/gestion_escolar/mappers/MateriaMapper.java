package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.response.MateriaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Materia;

public final class MateriaMapper {

	public static MateriaResponseDTO toResponse(Materia materia) {
		MateriaResponseDTO dto = new MateriaResponseDTO();
		dto.setId(materia.getId());
		dto.setNombre(materia.getNombre());
		dto.setAbreviatura(materia.getAbreviatura());
		dto.setCantidadModulos(materia.getCantidadModulos());
		return dto;
	}
}
