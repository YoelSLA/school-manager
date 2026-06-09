package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.request.CursoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.response.CursoDetalleDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class CursoMapper {

	public static Curso toEntity(CursoDTO dto) {
		return new Curso(
				dto.turno(),
				dto.anio(),
				dto.grado()
		);
	}

	public static CursoDetalleDTO toResponse(Curso curso) {
		return new CursoDetalleDTO(
				curso.getId(),
				curso.getAnio(),
				curso.getGrado(),
				curso.anioDivision(),
				curso.getTurno()
		);
	}

}
