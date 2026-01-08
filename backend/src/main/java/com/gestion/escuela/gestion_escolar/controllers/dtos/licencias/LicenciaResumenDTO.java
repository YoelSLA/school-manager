package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoMinimoDTO;

import java.time.LocalDate;

public record LicenciaResumenDTO(
		Long id,
		EmpleadoEducativoMinimoDTO empleado,
		String codigo,
		String articulo,
		String descripcion,
		LocalDate fechaDesde,
		LocalDate fechaHasta,
		boolean aplicaHoy
) {
}
