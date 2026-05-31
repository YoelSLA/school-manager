package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.request.CursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.response.CursoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class CursoMapper {

	public static Curso toEntity(CursoCreateDTO dto) {
		return new Curso(
				dto.turno(),
				dto.anio(),
				dto.grado()
		);
	}

	public static CursoResponseDTO toResponse(Curso curso) {
		return new CursoResponseDTO(
				curso.getId(),
				curso.getAnio(),
				curso.getGrado(),
				curso.anioDivision(),
				curso.getTurno()
		);
	}

}
