package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos;

import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaCreateDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DesignacionCursoCreateDTO(

		@NotNull(message = "El cupof para la designación es obligatorio")
		Integer cupof,

		@NotNull(message = "La materia es obligatoria")
		Long materiaId,

		@NotNull(message = "El curso es obligatorio")
		Long cursoId,

		@NotBlank(message = "La orientación es obligatoria")
		String orientacion,

		@NotEmpty(message = "Debe informar al menos un horario")
		@Valid
		List<FranjaHorariaCreateDTO> franjasHorarias
) {
	public DesignacionCursoCreateDTO {
		franjasHorarias = List.copyOf(franjasHorarias);
	}
}



