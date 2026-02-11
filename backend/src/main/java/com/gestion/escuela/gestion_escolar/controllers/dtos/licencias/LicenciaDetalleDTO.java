package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PeriodoResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;

import java.util.List;

public record LicenciaDetalleDTO(
		Long id,
		EmpleadoEducativoMinimoDTO empleado,
		LicenciaNormativaDTO normativa,
		String descripcion,
		PeriodoResponseDTO periodo,
		EstadoLicencia estadoLicencia,
		List<LicenciaDesignacionDTO> designaciones,
		List<LicenciaTimelineItemDTO> timeline
) {
}

