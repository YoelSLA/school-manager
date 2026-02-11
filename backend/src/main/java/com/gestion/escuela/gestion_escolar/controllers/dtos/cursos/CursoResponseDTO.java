package com.gestion.escuela.gestion_escolar.controllers.dtos.cursos;

import com.gestion.escuela.gestion_escolar.models.enums.Turno;

public record CursoResponseDTO(
		Long id,
		Integer anio,
		Integer grado,
		String division,
		Turno turno
) {

}
