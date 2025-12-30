package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import com.gestion.escuela.gestion_escolar.models.Curso;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CursoResponseDTO {

	private Long id;
	private Integer anio;
	private Integer grado;
	private String division;

}
