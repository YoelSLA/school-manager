package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoMinimoDTO;

import java.time.LocalDate;

public record LicenciaDetalleDTO(
		Long id,
		EmpleadoEducativoMinimoDTO empleado,
		String codigo,
		String articulo,
		String descripcion,
		String descripcionLicencia,
		LocalDate fechaDesde,
		LocalDate fechaHasta,
		boolean aplicaHoy
) {
}
