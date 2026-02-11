package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaEditDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;

import java.time.LocalDate;
import java.util.List;

public class DesignacionAdministrativaMapper {

	public static DesignacionAdministrativaResumenDTO toResumen(DesignacionAdministrativa d) {
		LocalDate hoy = LocalDate.now();
		return new DesignacionAdministrativaResumenDTO(
				d.getId(),
				d.getCupof(),
				d.getEstadoEn(LocalDate.now()),
				d.getRolEducativo(),
				obtenerFranjas(d)
		);
	}

	public static DesignacionAdministrativaEditDTO toEdit(DesignacionAdministrativa d) {
		return new DesignacionAdministrativaEditDTO(
				d.getId(),
				d.getCupof()
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

	public static DesignacionAdministrativa toUpdatedEntity(DesignacionAdministrativa d, DesignacionAdministrativaUpdateDTO dto) {
		throw new UnsupportedOperationException("toUpdatedEntity aún no implementado");
	}

	private static List<FranjaHorariaMinimoDTO> obtenerFranjas(DesignacionAdministrativa d) {
		return d.getFranjasHorarias().stream()
				.map(FranjaHorariaMapper::toMinimo)
				.toList();
	}

	private static List<AsignacionDetalleDTO> obtenerAsignaciones(DesignacionAdministrativa d) {
		return d.getAsignaciones().stream()
				.map(AsignacionMapper::toDetalle)
				.toList();
	}

}
