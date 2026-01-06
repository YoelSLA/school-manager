package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos.DesignacionCursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos.DesignacionCursoResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;

import java.util.List;

public class DesignacionCursoMapper {

	public static DesignacionCurso toEntity(
			DesignacionCursoCreateDTO dto,
			Escuela escuela,
			Curso curso,
			Materia materia
	) {

		DesignacionCurso designacion = new DesignacionCurso(
				escuela,
				dto.cupof(),
				materia,
				curso,
				dto.orientacion()
		);

		dto.franjasHorarias()
				.forEach(f ->
						designacion.agregarFranjaHoraria(
								FranjaHorariaMapper.toEntity(f)
						)
				);

		return designacion;
	}

	public static DesignacionCursoResumenDTO toResumen(DesignacionCurso d) {

		List<FranjaHorariaResponseDTO> franjas = d.getFranjasHorarias().stream()
				.map(FranjaHorariaMapper::toResponse)
				.toList();

		return new DesignacionCursoResumenDTO(
				d.getId(),
				d.getCupof(),
				d.getMateria().getNombre(),
				d.getCurso().anioDivision(),
				d.getOrientacion(),
				d.getRolEducativo(),
				franjas
		);
	}

}
//
//	public static DesignacionCursoResponseDTO toResponse(DesignacionCurso designacionCurso) {
//
//		List<FranjaHorariaResponseDTO> franjasHorarias =
//				designacionCurso.getFranjasHorarias().stream()
//						.map(FranjaHorariaMapper::toResponse)
//						.toList();
//
//		return new DesignacionCursoResponseDTO(
//				designacionCurso.getCupof(),
//				designacionCurso.getOrientacion(),
//				designacionCurso.getSituacionDeRevista(),
//				designacionCurso.getRolEducativo(),
//				Optional.ofNullable(designacionCurso.getEmpleadoEducativo())
//						.map(EmpleadoEducativoBasicoMapper::toResponse)
//						.orElse(null),
//				CursoMapper.toResponse(designacionCurso.getCurso()),
//				MateriaMapper.toResponse(designacionCurso.getMateria()),
//				franjasHorarias,
//				designacionCurso.getEscuela().getNombre()
//		);
//	}

