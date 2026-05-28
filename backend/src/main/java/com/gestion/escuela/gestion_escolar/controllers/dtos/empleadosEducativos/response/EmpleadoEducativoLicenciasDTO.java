package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.response.LicenciaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.response.LicenciaEmpleadoEducativoRowDTO;

import java.util.List;

public record EmpleadoEducativoLicenciasDTO(
		EmpleadoEducativoBasicoDTO empleado,
		LicenciaDetalleDTO licenciaActiva,
		List<LicenciaEmpleadoEducativoRowDTO> historial,
		int totalHistorial
) {
}
