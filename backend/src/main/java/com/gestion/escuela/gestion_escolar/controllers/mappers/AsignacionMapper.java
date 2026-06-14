package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionEmpleadoEducativoRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO.AsignacionLicenciaAdministrativaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO.AsignacionLicenciaCursoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO.AsignacionLicenciaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.BajaAsignacionDTO;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AsignacionMapper {

	private static final LocalDate HOY = LocalDate.now();

	public static AsignacionDetalleDTO toDetalle(Asignacion a) {

		BajaAsignacionDTO bajaDefinitiva = new BajaAsignacionDTO(
				a.getFechaBaja(),
				a.getCausaBaja()
		);

		return new AsignacionDetalleDTO(
				a.getId(),
				PeriodoMapper.toDTO(a.getPeriodo()),
				a.getSituacionDeRevista(),
				a.getEstadoEn(LocalDate.now()),
				bajaDefinitiva,
				a.getSecuencia(),
				EmpleadoEducativoMapper.toBasico(a.getEmpleadoEducativo())
		);
	}

	public static AsignacionEmpleadoEducativoRowDTO toAsignacionRow(Asignacion a) {

		BajaAsignacionDTO baja = a.getFechaBaja() == null
				? null
				: new BajaAsignacionDTO(a.getFechaBaja(), a.getCausaBaja());

		return new AsignacionEmpleadoEducativoRowDTO(
				a.getId(),
				PeriodoMapper.toDTO(a.getPeriodo()),
				a.getSituacionDeRevista(),
				a.getEstadoEn(HOY),
				baja,
				a.getSecuencia(),
				DesignacionMapper.toDesignacionDTO(a.getDesignacion())
		);
	}

	public static AsignacionLicenciaDTO toLicenciaItem(Asignacion asignacion) {

		Designacion d = asignacion.getDesignacion();

		if (d instanceof DesignacionAdministrativa adm) {
			return new AsignacionLicenciaAdministrativaDTO(
					asignacion.getId(),
					asignacion.getSecuencia(),
					adm.getCupof(),
					adm.getRolEducativo(),
					asignacion.getSituacionDeRevista(),
					PeriodoMapper.toDTO(asignacion.getPeriodo())

			);
		}

		if (d instanceof DesignacionCurso curso) {
			return new AsignacionLicenciaCursoDTO(
					asignacion.getId(),
					asignacion.getSecuencia(),
					curso.getCupof(),
					curso.getRolEducativo(),
					asignacion.getSituacionDeRevista(),
					PeriodoMapper.toDTO(asignacion.getPeriodo()),
					MateriaMapper.toResponse(curso.getMateria()),
					CursoMapper.toResponse(curso.getCurso()),
					curso.getOrientacion()
			);
		}

		throw new IllegalStateException("Tipo de designación no soportado");
	}
}

