package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;

public record DesignacionCursoAsignacionDTO(
		Long id,
		Integer cupof,
		EstadoDesignacion estadoDesignacion,
		String materia,
		String curso,
		String orientacion
) {}
