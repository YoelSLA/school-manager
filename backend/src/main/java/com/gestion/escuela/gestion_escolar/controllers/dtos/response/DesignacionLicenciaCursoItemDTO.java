package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.response.CursoNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.response.MateriaNombreDTO;

public record DesignacionLicenciaCursoItemDTO(
		Long id,
		Integer cupof,
		String rolEducativo,
		MateriaNombreDTO materia,
		CursoNombreDTO curso,
		String orientacion,
		String tipoDesignacion
) implements DesignacionLicenciaItemDTO {
}