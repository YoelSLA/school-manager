package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record DesignacionAdministrativaCardDTO(
		Long id,
		Integer cupof,
		Integer cantidadFranjasHorarias,
		EstadoDesignacion estadoDesignacion,
		RolEducativo rolEducativo
) {
}
