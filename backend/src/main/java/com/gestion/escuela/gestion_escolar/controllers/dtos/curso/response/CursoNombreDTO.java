package com.gestion.escuela.gestion_escolar.controllers.dtos.curso.response;

import com.gestion.escuela.gestion_escolar.models.enums.Turno;

public record CursoNombreDTO(
		Long id,
		String division,
		Turno turno
) {
}
