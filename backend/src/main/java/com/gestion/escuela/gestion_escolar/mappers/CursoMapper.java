package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;

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

	public static CursoNombreDTO toNombreDTO(Curso curso) {
		return new CursoNombreDTO(
				curso.getId(),
				curso.anioDivision(),
				curso.getTurno()
		);
	}

}
