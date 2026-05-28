package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record LicenciaDesignacionCursoDTO(
		Long designacionId,
		Integer cupof,
		EstadoDesignacion estado,
		RolEducativo rolEducativo,
		String materia,
		String curso,
		String orientacion,
		AsignacionDetalleDTO asignacionActiva
) implements LicenciaDesignacionDTO {

	@Override
	@JsonProperty("tipo")
	public String tipo() {
		return "CURSO";
	}
}