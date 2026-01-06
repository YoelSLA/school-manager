package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos;

import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.util.List;

public record DesignacionCursoResumenDTO(
		Long id,
		Integer cupof,
		String materia,
		String curso,
		String orientacion,
		RolEducativo rolEducativo,
		List<FranjaHorariaResponseDTO> franjasHorarias
) {
	public DesignacionCursoResumenDTO {
		franjasHorarias = List.copyOf(franjasHorarias);
	}
}

