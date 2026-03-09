package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;

import java.time.LocalDate;
import java.util.List;

public class DesignacionAdministrativaMapper {

	public static DesignacionAdministrativaResumenDTO toResumen(DesignacionAdministrativa d) {
		return new DesignacionAdministrativaResumenDTO(
				d.getId(),
				d.getCupof(),
				d.getEstadoEn(LocalDate.now()),
				d.getRolEducativo(),
				obtenerFranjas(d)
		);
	}

	public static DesignacionAdministrativa toEntity(DesignacionAdministrativaCreateDTO dto, Escuela e) {

		DesignacionAdministrativa d = new DesignacionAdministrativa(e, dto.cupof(), dto.rolEducativo());

		dto.franjasHorarias().forEach(f -> {
			FranjaHoraria franja = FranjaHorariaMapper.toEntity(f);
			d.agregarFranjaHoraria(franja);
		});

		return d;
	}

	private static List<FranjaHorariaMinimoDTO> obtenerFranjas(DesignacionAdministrativa d) {
		return d.getFranjasHorarias().stream()
				.map(FranjaHorariaMapper::toMinimo)
				.toList();
	}


}
