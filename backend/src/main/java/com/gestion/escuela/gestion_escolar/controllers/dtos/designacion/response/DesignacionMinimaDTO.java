package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response;

public sealed interface DesignacionMinimaDTO
		permits DesignacionAdministrativaMinimaDTO,
		DesignacionCursoMinimaDTO {
}

