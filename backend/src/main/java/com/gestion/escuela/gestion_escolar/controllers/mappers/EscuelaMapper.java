package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.escuela.request.EscuelaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuela.response.EscuelaResumenDTO;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
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
