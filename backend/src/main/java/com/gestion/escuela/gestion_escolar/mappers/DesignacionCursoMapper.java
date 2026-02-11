package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos.DesignacionCursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos.DesignacionCursoResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;

import java.time.LocalDate;
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

		LocalDate hoy = LocalDate.now();
		List<FranjaHorariaMinimoDTO> franjas = d.getFranjasHorarias().stream()
				.map(FranjaHorariaMapper::toMinimo)
				.toList();

		return new DesignacionCursoResumenDTO(
				d.getId(),
				d.getCupof(),
				d.getEstadoEn(LocalDate.now()),
				d.getRolEducativo(),
				d.getMateria().getNombre(),
				d.getCurso().anioDivision(),
				d.getOrientacion(),
				franjas
		);
	}

}

