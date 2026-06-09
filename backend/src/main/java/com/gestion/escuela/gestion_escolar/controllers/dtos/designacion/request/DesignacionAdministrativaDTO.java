package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request;

import com.gestion.escuela.gestion_escolar.controllers.dtos.franjaHoraria.request.FranjaHorariaCreateDTO;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record DesignacionAdministrativaDTO(

		@NotNull(message = "El cupof para la designación es obligatorio")
		Integer cupof,

		@NotEmpty(message = "Debe informar al menos un horario")
		@Valid
		List<FranjaHorariaCreateDTO> franjasHorarias,

		@NotNull(message = "El rol educativo es obligatorio")
		RolEducativo rolEducativo
) {
	public DesignacionAdministrativaDTO {
		franjasHorarias = List.copyOf(franjasHorarias);
	}
}




