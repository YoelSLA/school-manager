package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas;

import com.gestion.escuela.gestion_escolar.controllers.dtos.horarios.FranjaHorariaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class DesignacionAdministrativaResumenDTO {

	private Long id;
	private Integer cupof;
	private List<FranjaHorariaResponseDTO> franjasHorarias;
	private RolEducativo rolEducativo;
}
