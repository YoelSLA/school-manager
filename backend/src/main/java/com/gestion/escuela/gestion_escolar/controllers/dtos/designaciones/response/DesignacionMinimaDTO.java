package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.response;

public sealed interface DesignacionMinimaDTO
		permits DesignacionAdministrativaMinimaDTO,
		DesignacionCursoMinimaDTO {
}

