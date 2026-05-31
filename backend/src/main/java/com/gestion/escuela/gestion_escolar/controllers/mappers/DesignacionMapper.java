package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionAdministrativaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionCursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.*;
import com.gestion.escuela.gestion_escolar.controllers.dtos.franjaHoraria.response.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.DesignacionLicenciaAdministrativaItemDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.DesignacionLicenciaCursoItemDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.DesignacionLicenciaItemDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DesignacionMapper {

	private static final LocalDate HOY = LocalDate.now();

	// ---------------------------
	// Public mapping entry points
	// ---------------------------

	public static DesignacionDetalleDTO toDetalle(Designacion d) {

		if (d instanceof DesignacionCurso dc) {
			return new DesignacionCursoDetalleDTO(
					dc.getId(),
					dc.getCupof(),
					dc.getEstadoEn(HOY),
					dc.getRolEducativo(),
					dc.getMateria().getNombre(),
					dc.getCurso().anioDivision(),
					dc.getOrientacion(),
					franjas(d),
					asignaciones(d),
					"CURSO"
			);
		}

		if (d instanceof DesignacionAdministrativa da) {
			return new DesignacionAdministrativaDetalleDTO(
					da.getId(),
					da.getCupof(),
					da.getEstadoEn(HOY),
					da.getRolEducativo(),
					asignaciones(da),
					franjas(da),
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
					CursoMapper.toResponse(curso.getCurso()),
					curso.getOrientacion(),
					"CURSO"
			);
		}

		throw new IllegalStateException("Tipo de designación no soportado");
	}

	public static DesignacionAdministrativaResumenDTO toResumen(DesignacionAdministrativa d) {
		final LocalDate hoy = LocalDate.now();
		return new DesignacionAdministrativaResumenDTO(
				d.getId(),
				d.getCupof(),
				d.getEstadoEn(hoy),
				d.getRolEducativo(),
				franjas(d)
		);
	}

	public static DesignacionCursoResumenDTO toResumen(DesignacionCurso d) {
		return new DesignacionCursoResumenDTO(
				d.getId(),
				d.getCupof(),
				d.getEstadoEn(HOY),
				d.getRolEducativo(),
				d.getMateria().getNombre(),
				d.getCurso().anioDivision(),
				d.getOrientacion(),
				franjas(d)
		);
	}

	// ---------------------------
	// Entity builders
	// ---------------------------

	public static DesignacionAdministrativa toEntity(DesignacionAdministrativaCreateDTO dto, Escuela e) {
		DesignacionAdministrativa d = new DesignacionAdministrativa(e, dto.cupof(), dto.rolEducativo());

		dto.franjasHorarias().forEach(f -> d.agregarFranjaHoraria(FranjaHorariaMapper.toEntity(f)));

		return d;
	}

	public static DesignacionCurso toEntity(
			DesignacionCursoCreateDTO dto,
			Escuela escuela,
			Curso curso,
			Materia materia,
			String orientacion
	) {
		DesignacionCurso designacion = new DesignacionCurso(
				escuela,
				dto.cupof(),
				materia,
				curso,
				orientacion
		);

		dto.franjasHorarias().forEach(f -> designacion.agregarFranjaHoraria(FranjaHorariaMapper.toEntity(f)));

		return designacion;
	}

	// ---------------------------
	// Private helpers
	// ---------------------------

	private static List<AsignacionDetalleDTO> asignaciones(Designacion d) {
		return d.getAsignaciones().stream()
				.map(AsignacionMapper::toDetalle)
				.toList();
	}

	private static List<FranjaHorariaMinimoDTO> franjas(Designacion d) {
		return d.getFranjasHorarias().stream()
				.map(FranjaHorariaMapper::toMinimo)
				.toList();
	}


}

