package com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionAsignacionDTO.DesignacionAsignacionDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.BajaAsignacionDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

public record AsignacionEmpleadoEducativoRowDTO(
		Long id,
		PeriodoDTO periodo,
		SituacionDeRevista situacionDeRevista,
		EstadoAsignacion estadoAsignacion,
		BajaAsignacionDTO bajaAsignacion,
		Integer secuencia,
		DesignacionAsignacionDTO designacion
) {
}