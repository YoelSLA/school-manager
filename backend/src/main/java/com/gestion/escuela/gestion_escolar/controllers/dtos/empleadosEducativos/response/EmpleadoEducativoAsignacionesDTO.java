package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.response.AsignacionEmpleadoEducativoRowDTO;

import java.util.List;

public record EmpleadoEducativoAsignacionesDTO(
		EmpleadoEducativoBasicoDTO empleado,
		List<AsignacionEmpleadoEducativoRowDTO> asignaciones,
		int total,
		int activas,
		int finalizadas,
		boolean tieneAsignacionesActivas
) {
}