package com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.response;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.util.List;

public record EmpleadoAsistenciaResponse(
		String id,
		String cuil,
		String nombre,
		String apellido,
		List<RolEducativo> roles
) {
}
