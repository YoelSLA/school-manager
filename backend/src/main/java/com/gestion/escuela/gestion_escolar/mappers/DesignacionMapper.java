package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.*;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;

import java.time.LocalDate;
import java.util.List;

public class DesignacionMapper {

	public static DesignacionDetalleDTO toDetalle(Designacion d) {
		LocalDate hoy = LocalDate.now();

		if (d instanceof DesignacionCurso dc) {
			return new DesignacionCursoDetalleDTO(
					dc.getId(),
					dc.getCupof(),
					dc.getEstadoEn(hoy),
					dc.getRolEducativo(),
					dc.getMateria().getNombre(),
					dc.getCurso().anioDivision(),
					dc.getOrientacion(),
					franjasHorarias(dc),
					asignaciones(dc),
					"CURSO"
			);
		}

		if (d instanceof DesignacionAdministrativa da) {
			return new DesignacionAdministrativaDetalleDTO(
					da.getId(),
					da.getCupof(),
					da.getEstadoEn(LocalDate.now()),
					da.getRolEducativo(),
					asignaciones(da),
					franjasHorarias(da),
					"ADMINISTRATIVA"
			);
		}

		throw new IllegalStateException("Tipo de designación no soportado");
	}

	public static DesignacionMinimaDTO toMinima(Designacion d) {

		if (d instanceof DesignacionAdministrativa da) {
			return new DesignacionAdministrativaMinimaDTO(
					da.getId(),
					da.getRolEducativo(),
					da.getCupof()
			);
		}

		if (d instanceof DesignacionCurso dc) {
			return new DesignacionCursoMinimaDTO(
					dc.getId(),
					dc.getCupof(),
					dc.getMateria().getNombre(),
					dc.getCurso().anioDivision(),
					dc.getRolEducativo()
			);
		}

		throw new IllegalStateException(
				"Tipo de designación no soportado: " + d.getClass()
		);
	}

	private static List<AsignacionDetalleDTO> asignaciones(Designacion d) {
		return d.getAsignaciones().stream()
				.map(AsignacionMapper::toDetalle)
				.toList();
	}

	private static List<FranjaHorariaMinimoDTO> franjasHorarias(Designacion d) {
		return d.getFranjasHorarias().stream()
				.map(FranjaHorariaMapper::toMinimo)
				.toList();
	}


}

