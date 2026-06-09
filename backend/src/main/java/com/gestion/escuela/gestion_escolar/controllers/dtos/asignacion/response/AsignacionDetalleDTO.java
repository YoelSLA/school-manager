package com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoBasicoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.BajaAsignacionDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

public record AsignacionDetalleDTO(
		Long id,
		PeriodoDTO periodo,
		SituacionDeRevista situacionDeRevista,
		EstadoAsignacion estadoAsignacion,
		BajaAsignacionDTO bajaAsignacion,
		Integer secuencia,
		EmpleadoEducativoBasicoDTO empleadoEducativoBasico
) {
}
