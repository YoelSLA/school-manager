package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;

import java.time.LocalDate;

public class AsignacionMapper {

	public static AsignacionDetalleDTO toDetalle(Asignacion a) {
		return new AsignacionDetalleDTO(
				a.getId(),
				EmpleadoEducativoMapper.toMinimo(a.getEmpleadoEducativo()),
				PeriodoMapper.toPeriodoResponse(a),
				a.getSituacionDeRevista(),
				a.getFechaBaja(),
				a.getCausaBaja(),
				a.getEstadoEn(LocalDate.now()),
				a.getSecuencia()
		);
	}

}

