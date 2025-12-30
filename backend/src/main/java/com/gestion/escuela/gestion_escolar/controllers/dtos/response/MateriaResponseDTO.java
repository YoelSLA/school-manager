package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import com.gestion.escuela.gestion_escolar.models.Materia;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MateriaResponseDTO {

	private Long id;
	private String nombre;
	private String abreviatura;
	private Integer cantidadModulos;

}

