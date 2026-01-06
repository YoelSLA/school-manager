package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record LicenciaCreateDTO(

		@NotNull(message = "La fecha desde es obligatoria")
		LocalDate fechaDesde,

		@NotNull(message = "La fecha hasta es obligatoria")
		LocalDate fechaHasta,

		@NotNull(message = "El tipo de licencia es obligatorio")
		TipoLicencia tipoLicencia,

		@Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
		String descripcion
		
) {
}


