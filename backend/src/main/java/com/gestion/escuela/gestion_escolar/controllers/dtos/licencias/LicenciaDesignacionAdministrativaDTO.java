package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record LicenciaDesignacionAdministrativaDTO(
		Long designacionId,
		Integer cupof,
		EstadoDesignacion estado,
		RolEducativo rolEducativo
) implements LicenciaDesignacionDTO {

	@Override
	@JsonProperty("tipo")
	public String tipo() {
		return "ADMINISTRATIVA";
	}
}

