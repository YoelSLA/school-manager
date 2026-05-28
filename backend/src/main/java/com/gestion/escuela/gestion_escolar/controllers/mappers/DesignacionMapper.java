package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.response.DesignacionAdministrativaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.response.DesignacionCursoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.response.DesignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.response.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.DesignacionLicenciaAdministrativaItemDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.DesignacionLicenciaCursoItemDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.DesignacionLicenciaItemDTO;
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

	public static DesignacionLicenciaItemDTO toLicenciaItem(Designacion d) {

		if (d instanceof DesignacionAdministrativa adm) {

			return new DesignacionLicenciaAdministrativaItemDTO(
					adm.getId(),
					adm.getCupof(),
					adm.getRolEducativo().name(),
					"ADMINISTRATIVA"
			);
		}

		if (d instanceof DesignacionCurso curso) {

			return new DesignacionLicenciaCursoItemDTO(
					curso.getId(),
					curso.getCupof(),
					curso.getRolEducativo().name(),
					MateriaMapper.toNombreDTO(curso.getMateria()),
					CursoMapper.toNombreDTO(curso.getCurso()),
					curso.getOrientacion(),
					"CURSO"
			);
		}

		throw new IllegalStateException("Tipo de designación no soportado");
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

