package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PeriodoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

import java.time.LocalDate;

public record EmpleadoEducativoAsignacionItemDTO(
		Long id,
		PeriodoResponseDTO periodo,
		SituacionDeRevista situacionDeRevista,
		LocalDate fechaBaja,
		CausaBaja causaBaja,
		EstadoAsignacion estadoAsignacion,
		Integer cupof,
		String tipoDesignacion
) {
}
