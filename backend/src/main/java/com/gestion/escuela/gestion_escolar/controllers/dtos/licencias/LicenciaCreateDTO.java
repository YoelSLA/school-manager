package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PeriodoCreateDTO;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record LicenciaCreateDTO(

		@NotNull(message = "El período es obligatorio")
		@Valid
		PeriodoCreateDTO periodo,

		@NotNull(message = "El tipo de licencia es obligatorio")
		TipoLicencia tipoLicencia,

		@Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
		String descripcion
) {
}


