package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionEmpleadoEducativoRowDTO;

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