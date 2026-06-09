package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionLicenciaItemDTO;

public record DesignacionLicenciaAdministrativaDTO(
		Long id,
		Integer cupof,
		String rolEducativo
) implements DesignacionLicenciaDTO {
}
