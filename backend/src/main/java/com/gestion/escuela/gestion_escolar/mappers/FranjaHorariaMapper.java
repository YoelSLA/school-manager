package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;

public final class FranjaHorariaMapper {

	public static FranjaHoraria toEntity(FranjaHorariaCreateDTO dto) {
		return new FranjaHoraria(dto.getDia(), dto.getHoraDesde(), dto.getHoraHasta());
	}

	public static FranjaHorariaResponseDTO toResponse(FranjaHoraria franjaHoraria) {
		return new FranjaHorariaResponseDTO(
				franjaHoraria.getDia(),
				franjaHoraria.getHoraDesde(),
				franjaHoraria.getHoraHasta()
		);

	}
}