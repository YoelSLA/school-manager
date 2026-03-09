package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;

public record DesignacionCursoFilterDTO(
		Long cursoId,
		Long materiaId,
		String orientacion,
		EstadoDesignacion estado
) {
}
