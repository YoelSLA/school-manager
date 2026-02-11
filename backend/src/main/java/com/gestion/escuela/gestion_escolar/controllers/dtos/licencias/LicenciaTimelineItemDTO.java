package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PeriodoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.enums.TipoPeriodoLicencia;

public record LicenciaTimelineItemDTO(
		Long id,
		TipoPeriodoLicencia tipo,
		PeriodoResponseDTO periodo
) {
}

