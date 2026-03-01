package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record LicenciaDesignacionCursoDTO(
		Long designacionId,
		Integer cupof,
		EstadoDesignacion estado,
		RolEducativo rolEducativo,
		String materia,
		String curso,
		String orientacion
) implements LicenciaDesignacionDTO {

	@Override
	@JsonProperty("tipo")
	public String tipo() {
		return "CURSO";
	}
}