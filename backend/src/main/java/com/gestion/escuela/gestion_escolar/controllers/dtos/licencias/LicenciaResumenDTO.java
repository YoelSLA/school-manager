package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PeriodoResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;

public record LicenciaResumenDTO(
		Long id,
		EmpleadoEducativoMinimoDTO empleado,
		LicenciaNormativaDTO normativa,
		String descripcion,
		PeriodoResponseDTO periodo,
		EstadoLicencia estadoLicencia
) {
}
