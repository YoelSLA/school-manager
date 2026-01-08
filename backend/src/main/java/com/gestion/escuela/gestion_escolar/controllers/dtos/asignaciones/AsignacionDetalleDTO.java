package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

import java.time.LocalDate;

public record AsignacionDetalleDTO(
		Long id,
		EmpleadoEducativoMinimoDTO empleado,
		LocalDate fechaTomaPosesion,
		LocalDate fechaCese,
		SituacionDeRevista situacionDeRevista,
		LocalDate fechaBaja,
		CausaBaja causaBaja,
		boolean estaDisponible
) {
}
