package com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoBasicoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoCerradoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;

public record LicenciaResumenDTO(
		Long id,
		EmpleadoEducativoBasicoDTO empleado,
		LicenciaNormativaDTO normativa,
		String descripcion,
		PeriodoCerradoDTO periodo,
		EstadoLicencia estadoLicencia,
		Long diasRestantes
) {
}
