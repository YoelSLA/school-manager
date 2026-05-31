package com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoCerradoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.TipoPeriodoLicencia;

public record LicenciaTimelineItemDTO(
		Long id,
		TipoPeriodoLicencia tipo,
		PeriodoCerradoDTO periodo
) {
}

