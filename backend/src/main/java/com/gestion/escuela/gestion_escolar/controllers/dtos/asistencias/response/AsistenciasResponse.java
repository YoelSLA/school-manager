package com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.response;

import java.util.List;

public record AsistenciasResponse(
		List<EmpleadoAsistenciaResponse> empleados,
		List<RolCount> roles
) {
}
