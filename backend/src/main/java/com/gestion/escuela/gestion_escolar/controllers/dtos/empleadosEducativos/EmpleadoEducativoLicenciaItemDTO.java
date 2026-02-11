package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PeriodoResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaNormativaDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;

public record EmpleadoEducativoLicenciaItemDTO(
		Long id,
		LicenciaNormativaDTO normativa,
		PeriodoResponseDTO periodo,
		EstadoLicencia estadoLicencia
) {
}

