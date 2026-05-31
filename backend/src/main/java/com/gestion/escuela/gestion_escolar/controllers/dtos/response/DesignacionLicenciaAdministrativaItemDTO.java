package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

public record DesignacionLicenciaAdministrativaItemDTO(
		Long id,
		Integer cupof,
		String rolEducativo,
		String tipoDesignacion
) implements DesignacionLicenciaItemDTO {
}
