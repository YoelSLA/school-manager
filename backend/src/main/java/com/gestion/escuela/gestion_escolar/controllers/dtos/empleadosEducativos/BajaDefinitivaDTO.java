package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import jakarta.validation.constraints.NotNull;

public record BajaDefinitivaDTO(

		@NotNull(message = "La causa de la baja es obligatoria")
		CausaBaja causa
) {
}
