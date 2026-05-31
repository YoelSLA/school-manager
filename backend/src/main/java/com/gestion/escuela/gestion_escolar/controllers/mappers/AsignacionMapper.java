package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionAdministrativaEmpleadoEducativoRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionCursoEmpleadoEducativoRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionEmpleadoEducativoRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionAdministrativaAsignacionDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionCursoAsignacionDTO;
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
		return new AsignacionDetalleDTO(
				a.getId(),
				EmpleadoEducativoMapper.toBasico(a.getEmpleadoEducativo()),
				PeriodoMapper.toDTO(a.getPeriodo()),
				a.getSituacionDeRevista(),
				a.getFechaBaja(),
				a.getCausaBaja(),
				a.getEstadoEn(LocalDate.now()),
				a.getSecuencia()
		);
	}

	public static AsignacionEmpleadoEducativoRowDTO toAsignacionRow(Asignacion a) {

		BajaAsignacionDTO baja = a.getFechaBaja() == null
				? null
				: new BajaAsignacionDTO(a.getFechaBaja(), a.getCausaBaja());

		Designacion d = a.getDesignacion();

		if (d instanceof DesignacionCurso curso) {
			return new AsignacionCursoEmpleadoEducativoRowDTO(
					a.getId(),
					PeriodoMapper.toDTO(a.getPeriodo()),
					a.getSituacionDeRevista(),
					a.getEstadoEn(HOY),
					baja,
					new DesignacionCursoAsignacionDTO(
							curso.getId(),
							curso.getCupof(),
							curso.getEstadoEn(HOY),
							curso.getMateria().getNombre(),
							curso.getCurso().toString(),
							curso.getOrientacion()
					)
			);
		}

		if (d instanceof DesignacionAdministrativa administrativa) {
			return new AsignacionAdministrativaEmpleadoEducativoRowDTO(
					a.getId(),
					PeriodoMapper.toDTO(a.getPeriodo()),
					a.getSituacionDeRevista(),
					a.getEstadoEn(HOY),
					baja,
					new DesignacionAdministrativaAsignacionDTO(
							administrativa.getId(),
							administrativa.getCupof(),
							administrativa.getRolEducativo(),
							administrativa.getEstadoEn(HOY)
					)
			);
		}

		throw new IllegalArgumentException(
				"Tipo de designación no soportado: "
						+ d.getClass().getSimpleName()
		);
	}

}

