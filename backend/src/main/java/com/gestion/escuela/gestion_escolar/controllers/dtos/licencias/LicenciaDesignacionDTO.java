package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;

public sealed interface LicenciaDesignacionDTO
		permits LicenciaDesignacionAdministrativaDTO,
		LicenciaDesignacionCursoDTO {

	Long designacionId();

	Integer cupof();

	EstadoDesignacion estado();

	String tipo();
}

