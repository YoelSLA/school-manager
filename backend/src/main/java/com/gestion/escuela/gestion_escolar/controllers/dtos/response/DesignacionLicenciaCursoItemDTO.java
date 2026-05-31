package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.response.CursoResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.response.MateriaNombreDTO;

public record DesignacionLicenciaCursoItemDTO(
		Long id,
		Integer cupof,
		String rolEducativo,
		MateriaNombreDTO materia,
		CursoResponseDTO curso,
		String orientacion,
		String tipoDesignacion
) implements DesignacionLicenciaItemDTO {
}