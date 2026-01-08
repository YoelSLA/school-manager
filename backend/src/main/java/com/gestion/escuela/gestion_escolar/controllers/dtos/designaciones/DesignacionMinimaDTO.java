package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

public sealed interface DesignacionMinimaDTO
		permits DesignacionAdministrativaMinimaDTO,
		DesignacionCursoMinimaDTO {
}

