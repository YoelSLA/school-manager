package com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO;

import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

public record AsignacionLicenciaAdministrativaDTO(
		Long id,
		Integer secuencia,
		Integer cupof,
		RolEducativo rolEducativo,
		SituacionDeRevista situacionDeRevista,
		PeriodoDTO periodo
) implements AsignacionLicenciaDTO {
}
