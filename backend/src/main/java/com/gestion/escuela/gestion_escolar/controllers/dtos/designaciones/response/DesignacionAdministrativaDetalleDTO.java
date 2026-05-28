package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.response.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.util.List;

public record DesignacionAdministrativaDetalleDTO(
		Long id,
		Integer cupof,
		EstadoDesignacion estadoDesignacion,
		RolEducativo rolEducativo,
		List<AsignacionDetalleDTO> asignaciones,
		List<FranjaHorariaMinimoDTO> franjasHorarias,
		String tipo
) implements DesignacionDetalleDTO {

}


