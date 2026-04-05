package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;

public record CargoDesignacionCursoDTO(
		Long id,
		Integer cupof,
		EstadoDesignacion estadoDesignacion,
		String materia,
		String curso,
		String orientacion
) implements CargoDesignacionDTO {
}
