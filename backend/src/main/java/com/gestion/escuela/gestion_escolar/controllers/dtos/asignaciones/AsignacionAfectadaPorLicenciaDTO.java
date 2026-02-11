package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PeriodoResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionMinimaDTO;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

import java.time.LocalDate;

public record AsignacionAfectadaPorLicenciaDTO(
		Long id,
		DesignacionMinimaDTO designacion,
		SituacionDeRevista situacionDeRevista,
		PeriodoResponseDTO periodo,
		LocalDate fechaBaja,
		CausaBaja causaBaja,
		boolean estaDisponible
) {
}
