package com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record RolCount(
		RolEducativo id,
		String label,
		int count
) {
}