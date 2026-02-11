package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import java.util.List;

public record LicenciaTimelineDTO(
		Long licenciaActualId,
		List<LicenciaTimelineItemDTO> items
) {
}
