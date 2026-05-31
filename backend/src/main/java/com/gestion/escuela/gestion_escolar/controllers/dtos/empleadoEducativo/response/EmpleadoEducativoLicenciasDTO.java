package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaEmpleadoEducativoRowDTO;

import java.util.List;

public record EmpleadoEducativoLicenciasDTO(
		EmpleadoEducativoBasicoDTO empleado,
		LicenciaDetalleDTO licenciaActiva,
		List<LicenciaEmpleadoEducativoRowDTO> historial,
		int totalHistorial
) {
}
