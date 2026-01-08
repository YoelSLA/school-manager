package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record DesignacionCursoMinimaDTO(
		Long id,
		Integer cupof,
		String materia,
		String curso,
		RolEducativo rolEducativo
) implements DesignacionMinimaDTO {
}
