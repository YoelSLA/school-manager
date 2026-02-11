package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.*;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoPeriodoLicencia;

import java.time.LocalDate;
import java.util.List;

public class LicenciaMapper {

	private static final LocalDate HOY = LocalDate.now();

	/* =========================
	   RESUMEN / CARD
	   ========================= */

	public static LicenciaResumenDTO toResumen(Licencia l) {
		TipoLicencia tipo = l.getTipoLicencia();

		// 🔹 Normativa encapsulada
		LicenciaNormativaDTO normativa =
				new LicenciaNormativaDTO(
						tipo.getCodigo(),
						tipo.getArticulo(),
						tipo.getDescripcion()
				);

		return new LicenciaResumenDTO(
				l.getId(),
				EmpleadoEducativoMapper.toMinimo(l.getEmpleadoEducativo()),
				normativa,
				tipo.getDescripcion(),
				PeriodoMapper.toPeriodoResponse(l),
				l.getEstadoEn(HOY)
		);
	}

	/* =========================
	   DETALLE
	   ========================= */

	public static LicenciaDetalleDTO toDetalle(Licencia l) {

		TipoLicencia tipo = l.getTipoLicencia();

		// 🔹 Normativa encapsulada
		LicenciaNormativaDTO normativa =
				new LicenciaNormativaDTO(
						tipo.getCodigo(),
						tipo.getArticulo(),
						tipo.getDescripcion()
				);

		// 🔹 Designaciones afectadas (igual que antes)
		List<LicenciaDesignacionDTO> designaciones =
				l.getEmpleadoEducativo()
						.designacionesAfectadasPor(l)
						.stream()
						.map(LicenciaMapper::toDesignacionDTO)
						.toList();

		// 🔹 Timeline completo desde la raíz
		List<LicenciaTimelineItemDTO> timeline =
				l.cadenaCompleta().stream()
						.map(LicenciaMapper::toTimelineItem)
						.toList();

		return new LicenciaDetalleDTO(
				l.getId(),
				EmpleadoEducativoMapper.toMinimo(l.getEmpleadoEducativo()),
				normativa,
				l.getDescripcion(),
				PeriodoMapper.toPeriodoResponse(l),
				l.getEstadoEn(HOY),
				designaciones,
				timeline
		);
	}

	/* =========================
	   DESIGNACIONES AFECTADAS
	   ========================= */

	private static LicenciaDesignacionDTO toDesignacionDTO(Designacion d) {

		if (d instanceof DesignacionAdministrativa da) {
			return new LicenciaDesignacionAdministrativaDTO(
					da.getId(),
					da.getCupof(),
					da.getEstadoEn(HOY),
					da.getRolEducativo()
			);
		}

		if (d instanceof DesignacionCurso dc) {
			return new LicenciaDesignacionCursoDTO(
					dc.getId(),
					dc.getCupof(),
					dc.getEstadoEn(HOY),
					dc.getRolEducativo(),
					dc.getMateria().getNombre(),
					dc.getCurso().anioDivision(),
					dc.getOrientacion()
			);
		}

		throw new IllegalStateException(
				"Tipo de designación no soportado: " + d.getClass().getSimpleName()
		);
	}

	private static LicenciaTimelineItemDTO toTimelineItem(Licencia l) {
		return new LicenciaTimelineItemDTO(
				l.getId(),
				l.getLicenciaAnterior() == null ? TipoPeriodoLicencia.ORIGINAL : TipoPeriodoLicencia.RENOVACION,
				PeriodoMapper.toPeriodoResponse(l)

		);
	}
}
