package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionAdministrativaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionCursoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;

import java.util.List;

public class DesignacionMapper {

	public static DesignacionDetalleDTO toDetalle(Designacion d) {

		if (d instanceof DesignacionCurso dc) {
			return toDetalleCurso(dc);
		}

		if (d instanceof DesignacionAdministrativa da) {
			return toDetalleAdministrativa(da);
		}

		throw new IllegalStateException("Tipo de designación no soportado");
	}

	private static DesignacionCursoDetalleDTO toDetalleCurso(DesignacionCurso dc) {
		return new DesignacionCursoDetalleDTO(
				dc.getId(),
				dc.getCupof(),
				dc.getMateria().getNombre(),
				dc.getCurso().anioDivision(),
				dc.getOrientacion(),
				franjasHorarias(dc),
				asignaciones(dc)
		);
	}

	private static DesignacionAdministrativaDetalleDTO toDetalleAdministrativa(
			DesignacionAdministrativa da
	) {
		return new DesignacionAdministrativaDetalleDTO(
				da.getId(),
				da.getCupof(),
				da.getRolEducativo(),
				asignaciones(da),
				franjasHorarias(da)
		);
	}

	private static List<AsignacionDetalleResponseDTO> asignaciones(Designacion d) {
		return d.getAsignaciones().stream()
				.map(AsignacionMapper::toResponse)
				.toList();
	}

	private static List<FranjaHorariaResponseDTO> franjasHorarias(Designacion d) {
		return d.getFranjasHorarias().stream()
				.map(FranjaHorariaMapper::toResponse)
				.toList();
	}


}

