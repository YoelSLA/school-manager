package com.gestion.escuela.gestion_escolar.models.records;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record RolCount(
		RolEducativo id,
		String label,
		int count
) {
}