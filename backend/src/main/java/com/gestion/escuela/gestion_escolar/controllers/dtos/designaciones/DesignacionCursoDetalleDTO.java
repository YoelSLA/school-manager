package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaResponseDTO;

import java.util.List;

public record DesignacionCursoDetalleDTO(
		Long id,
		Integer cupof,
		String materia,
		String curso,
		String orientacion,
		List<FranjaHorariaResponseDTO> franjasHorarias,
		List<AsignacionDetalleResponseDTO> asignaciones
) implements DesignacionDetalleDTO {
}
