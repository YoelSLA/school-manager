package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.request.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.response.MateriaDetalleDTO;
import com.gestion.escuela.gestion_escolar.models.Materia;

public class MateriaMapper {

	private MateriaMapper() {}

	public static Materia toEntity(MateriaCreateDTO dto) {

		return new Materia(
				dto.nombre(),
				dto.abreviatura(),
				dto.cantidadModulos()
		);
	}

	public static MateriaDetalleDTO toResponse(Materia m) {
		return new MateriaDetalleDTO(
				m.getId(),
				m.getNombre(),
				m.getAbreviatura(),
				m.getCantidadModulos()
		);
	}

}
