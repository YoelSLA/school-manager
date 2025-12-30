package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.CupofCursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.CupofCursoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofCurso;

public class CupofCursoMapper {

	public static CupofCurso toEntity(
			CupofCursoCreateDTO dto,
			Escuela escuela,
			Curso curso,
			Materia materia,
			EmpleadoEducativo empleado
	) {
		CupofCurso cupof = new CupofCurso();
		cupof.setEscuela(escuela);
		cupof.setCurso(curso);
		cupof.setMateria(materia);
		cupof.setOrientacion(dto.getOrientacion().trim());
		cupof.setSituacionDeRevista(dto.getSituacion());
		cupof.setEmpleadoEducativo(empleado);
		cupof.setFranjasHorarias(
				dto.getHorarios().stream()
						.map(h -> FranjaHorariaMapper.toEntity(h, cupof))
						.toList()
		);
		return cupof;
	}

	public static CupofCursoResponseDTO toResponse(CupofCurso entity) {
		CupofCursoResponseDTO dto = new CupofCursoResponseDTO();

		dto.setNumeroCupof(entity.getNumeroCupof());
		dto.setOrientacion(entity.getOrientacion());
		dto.setSituacion(entity.getSituacionDeRevista());
		dto.setRolEducativo(entity.getRolEducativo());
		dto.setCurso(CursoMapper.toResponse(entity.getCurso()));
		dto.setMateria(MateriaMapper.toResponse(entity.getMateria()));
		dto.setHorarios(
				entity.getFranjasHorarias().stream()
						.map(FranjaHorariaMapper::toResponse)
						.toList());
		return dto;
	}
}
