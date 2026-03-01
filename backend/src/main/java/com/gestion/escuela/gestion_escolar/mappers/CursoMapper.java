package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;

public final class CursoMapper {

	public static Curso toEntity(CursoCreateDTO d, Escuela e) {
		return new Curso(
				d.turno(),
				d.anio(),
				d.grado(),
				e
		);
	}

	public static CursoResponseDTO toResponse(Curso c) {
		return new CursoResponseDTO(
				c.getId(),
				c.getAnio(),
				c.getGrado(),
				c.anioDivision(),
				c.getTurno()
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
