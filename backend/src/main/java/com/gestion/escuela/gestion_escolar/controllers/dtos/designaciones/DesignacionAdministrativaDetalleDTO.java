package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.util.List;

public record DesignacionAdministrativaDetalleDTO(
		Long id,
		Integer cupof,
		RolEducativo rolEducativo,
		List<AsignacionDetalleResponseDTO> asignaciones,
		List<FranjaHorariaResponseDTO> franjasHorarias
) implements DesignacionDetalleDTO {
}

