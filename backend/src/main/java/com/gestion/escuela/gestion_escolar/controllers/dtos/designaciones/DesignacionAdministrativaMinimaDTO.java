package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record DesignacionAdministrativaMinimaDTO(
		Long id,
		RolEducativo rolEducativo,
		Integer cupof
) implements DesignacionMinimaDTO {
}

