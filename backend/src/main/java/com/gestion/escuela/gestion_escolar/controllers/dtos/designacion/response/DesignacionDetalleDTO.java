package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response;

public sealed interface DesignacionDetalleDTO
		permits DesignacionAdministrativaDetalleDTO,
		DesignacionCursoDetalleDTO {
}
