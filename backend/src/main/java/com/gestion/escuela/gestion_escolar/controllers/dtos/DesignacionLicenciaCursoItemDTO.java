package com.gestion.escuela.gestion_escolar.controllers.dtos;

import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaNombreDTO;

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