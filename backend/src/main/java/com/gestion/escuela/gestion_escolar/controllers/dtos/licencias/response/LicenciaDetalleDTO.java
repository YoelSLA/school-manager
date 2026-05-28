package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.response.EmpleadoEducativoBasicoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoCerradoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;

public record LicenciaDetalleDTO(
		Long id,
		EmpleadoEducativoBasicoDTO empleado,
		LicenciaNormativaDTO normativa,
		String descripcion,
		PeriodoCerradoDTO periodo,
		EstadoLicencia estadoLicencia
) {
}

