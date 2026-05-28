package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.response.EmpleadoEducativoBasicoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

import java.time.LocalDate;

public record AsignacionDetalleDTO(
		Long id,
		EmpleadoEducativoBasicoDTO empleado,
		PeriodoDTO periodo,
		SituacionDeRevista situacionDeRevista,
		LocalDate fechaBaja,
		CausaBaja causaBaja,
		EstadoAsignacion estadoAsignacion,
		Integer secuencia
) {
}
