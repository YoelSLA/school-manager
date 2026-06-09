package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionLicenciaItemDTO;

import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.response.CursoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.response.MateriaDetalleDTO;

public record DesignacionLicenciaCursoDTO(
		Long id,
		Integer cupof,
		String rolEducativo,
		MateriaDetalleDTO materia,
		CursoDetalleDTO curso,
		String orientacion
) implements DesignacionLicenciaDTO {
}