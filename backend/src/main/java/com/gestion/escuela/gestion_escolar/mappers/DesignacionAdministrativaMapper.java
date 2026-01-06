package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionAdministrativaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaEditDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;

import java.util.List;

public class DesignacionAdministrativaMapper {

	public static DesignacionAdministrativaResumenDTO toResumen(DesignacionAdministrativa d) {
		return new DesignacionAdministrativaResumenDTO(
				d.getId(),
				d.getCupof(),
				obtenerFranjas(d),
				d.getRolEducativo()
		);
	}

	public static DesignacionAdministrativaDetalleDTO toDetalle(DesignacionAdministrativa d) {
		return new DesignacionAdministrativaDetalleDTO(
				d.getId(),
				d.getCupof(),
				d.getRolEducativo(),
				obtenerAsignaciones(d),
				obtenerFranjas(d)
		);
	}

	public static DesignacionAdministrativaEditDTO toEdit(DesignacionAdministrativa d) {
		return new DesignacionAdministrativaEditDTO(
				d.getId(),
				d.getCupof()
		);
	}

	public static DesignacionAdministrativa toEntity(DesignacionAdministrativaCreateDTO d, Escuela e) {
		return new DesignacionAdministrativa(
				e,
				d.cupof(),
				d.rolEducativo()
		);
	}

	public static DesignacionAdministrativa toUpdatedEntity(DesignacionAdministrativa d, DesignacionAdministrativaUpdateDTO dto) {
		throw new UnsupportedOperationException("toUpdatedEntity aún no implementado");
	}

	private static List<FranjaHorariaResponseDTO> obtenerFranjas(DesignacionAdministrativa d) {
		return d.getFranjasHorarias().stream()
				.map(FranjaHorariaMapper::toResponse)
				.toList();
	}

	private static List<AsignacionDetalleResponseDTO> obtenerAsignaciones(DesignacionAdministrativa d) {
		return d.getAsignaciones().stream()
				.map(AsignacionMapper::toResponse)
				.toList();
	}

}
