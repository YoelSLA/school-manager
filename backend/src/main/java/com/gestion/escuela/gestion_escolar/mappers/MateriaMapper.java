package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Materia;

public class MateriaMapper {

	public static Materia toEntity(MateriaCreateDTO d) {
		return new Materia(
				d.nombre(),
				d.abreviatura(),
				d.cantidadModulos()
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

	public static MateriaNombreDTO toNombreDTO(Materia materia) {
		return new MateriaNombreDTO(
				materia.getId(),
				materia.getNombre()
		);
	}


}
