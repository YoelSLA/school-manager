package com.gestion.escuela.gestion_escolar.controllers.dtos;

public record DesignacionLicenciaAdministrativaItemDTO(
		Long id,
		Integer cupof,
		String rolEducativo,
		String tipoDesignacion
) implements DesignacionLicenciaItemDTO {
}
