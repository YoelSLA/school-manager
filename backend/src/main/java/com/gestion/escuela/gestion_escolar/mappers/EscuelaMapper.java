package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.EscuelaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.EscuelaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Escuela;

public class EscuelaMapper {

	public static Escuela toEntity(EscuelaCreateDTO dto) {
		return new Escuela(dto.getNombre(), dto.getLocalidad(), dto.getDireccion(), dto.getTelefono());
	}

	public static EscuelaResponseDTO toResponse(Escuela e) {
		return new EscuelaResponseDTO(
				e.getId(),
				e.getNombre(),
				e.getLocalidad(),
				e.getDireccion(),
				e.getTelefono()
		);
	}
}
