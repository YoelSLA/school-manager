package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record CargoDesignacionAdministrativaDTO(
		Long id,
		Integer cupof,
		RolEducativo rolEducativo,
		EstadoDesignacion estadoDesignacion
) implements CargoDesignacionDTO {

}
