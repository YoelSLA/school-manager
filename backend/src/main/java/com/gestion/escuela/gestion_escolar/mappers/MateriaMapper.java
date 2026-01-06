package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;

public class MateriaMapper {

	public static Materia toEntity(MateriaCreateDTO d, Escuela e) {
		return new Materia(
				d.nombre(),
				d.abreviatura(),
				d.cantidadModulos(),
				e
		);
	}

	public static MateriaResponseDTO toResponse(Materia m) {
		return new MateriaResponseDTO(
				m.getId(),
				m.getNombre(),
				m.getAbreviatura(),
				m.getCantidadModulos()
		);
	}


}
