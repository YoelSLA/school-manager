package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas;

import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.util.List;

public record DesignacionAdministrativaResumenDTO(
		Long id,
		Integer cupof,
		EstadoDesignacion estadoDesignacion,
		RolEducativo rolEducativo,
		List<FranjaHorariaMinimoDTO> franjasHorarias
) {
	public DesignacionAdministrativaResumenDTO {
		franjasHorarias = List.copyOf(franjasHorarias);
	}
}