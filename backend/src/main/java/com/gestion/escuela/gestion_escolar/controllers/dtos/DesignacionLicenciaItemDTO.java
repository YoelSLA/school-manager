package com.gestion.escuela.gestion_escolar.controllers.dtos;

public sealed interface DesignacionLicenciaItemDTO
		permits DesignacionLicenciaCursoItemDTO,
		DesignacionLicenciaAdministrativaItemDTO {
}
