package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

public sealed interface DesignacionLicenciaItemDTO
		permits DesignacionLicenciaCursoItemDTO,
		DesignacionLicenciaAdministrativaItemDTO {
}
