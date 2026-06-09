package com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
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
		AsignacionDetalleDTO cobertura
) implements LicenciaDesignacionDTO {

	@Override
	@JsonProperty("tipo")
	public String tipo() {
		return "CURSO";
	}
}