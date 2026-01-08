package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.EscuelaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.EscuelaResumenDTO;
import com.gestion.escuela.gestion_escolar.models.Escuela;

public class EscuelaMapper {

	public static Escuela toEntity(EscuelaCreateDTO dto) {
		return new Escuela(dto.nombre(), dto.localidad(), dto.direccion(), dto.telefono());
	}

	public static EscuelaResumenDTO toResponse(Escuela e) {
		return new EscuelaResumenDTO(
				e.getId(),
				e.getNombre(),
				e.getLocalidad(),
				e.getDireccion(),
				e.getTelefono()
		);
	}
}
