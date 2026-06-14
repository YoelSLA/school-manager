package com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO;

import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.response.CursoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.response.MateriaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

public record AsignacionLicenciaCursoDTO(
		Long id,
		Integer secuencia,
		Integer cupof,
		RolEducativo rolEducativo,
		SituacionDeRevista situacionDeRevista,
		PeriodoDTO periodo,
		MateriaDetalleDTO materia,
		CursoDetalleDTO curso,
		String orientacion

) implements AsignacionLicenciaDTO {
}