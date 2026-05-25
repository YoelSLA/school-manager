package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;

public final class FranjaHorariaMapper {

	public static FranjaHoraria toEntity(FranjaHorariaCreateDTO dto) {
		return new FranjaHoraria(dto.dia(), dto.horaDesde(), dto.horaHasta());
	}

	public static FranjaHorariaMinimoDTO toMinimo(FranjaHoraria franjaHoraria) {
		return new FranjaHorariaMinimoDTO(
				franjaHoraria.getDia(),
				franjaHoraria.getHoraDesde(),
				franjaHoraria.getHoraHasta()
		);

	}
}