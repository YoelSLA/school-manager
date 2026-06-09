package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionDetalleDTO;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.franjaHoraria.response.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.util.List;

public record DesignacionAdministrativaDetalleDTO(
		Long id,
		Integer cupof,
		EstadoDesignacion estadoDesignacion,
		RolEducativo rolEducativo,
		List<AsignacionDetalleDTO> asignaciones,
		List<FranjaHorariaMinimoDTO> franjasHorarias
) implements DesignacionDetalleDTO {

}


