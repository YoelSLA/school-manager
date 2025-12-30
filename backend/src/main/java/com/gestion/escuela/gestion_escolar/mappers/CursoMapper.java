package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.response.CursoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;

public final class CursoMapper {

	public static CursoResponseDTO toResponse(Curso curso) {
		CursoResponseDTO dto = new CursoResponseDTO();
		dto.setId(curso.getId());
		dto.setAnio(curso.getAnio());
		dto.setGrado(curso.getGrado());
		dto.setDivision(formatearCurso(curso));
		return dto;
	}

	private static String formatearCurso(Curso curso) {
		return curso.getAnio() + "° " + curso.getGrado();
	}
}
