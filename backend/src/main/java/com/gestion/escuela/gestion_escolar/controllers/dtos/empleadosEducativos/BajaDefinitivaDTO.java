package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record BajaDefinitivaDTO(
		
		@NotNull(message = "La fecha de baja es obligatoria")
		LocalDate fechaBaja,

		@NotNull(message = "La causa de la baja es obligatoria")
		CausaBaja causa
) {
}
