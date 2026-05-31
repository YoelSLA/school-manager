package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record DesignacionAdministrativaAsignacionDTO(
		Long id,
		Integer cupof,
		RolEducativo rolEducativo,
		EstadoDesignacion estadoDesignacion
) {}
