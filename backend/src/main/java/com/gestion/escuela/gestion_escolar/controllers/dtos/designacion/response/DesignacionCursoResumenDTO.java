package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.franjaHoraria.response.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.util.List;

public record DesignacionCursoResumenDTO(
		Long id,
		Integer cupof,
		EstadoDesignacion estadoDesignacion,
		RolEducativo rolEducativo,
		String materia,
		String curso,
		String orientacion,
		List<FranjaHorariaMinimoDTO> franjasHorarias
) {
	public DesignacionCursoResumenDTO {
		franjasHorarias = List.copyOf(franjasHorarias);
	}
}

