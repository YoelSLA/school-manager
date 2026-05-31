package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.franjaHoraria.request.FranjaHorariaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.franjaHoraria.response.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
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