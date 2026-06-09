package com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.request;

import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record RenovarLicenciaDTO(

		@NotNull(message = "El tipo de licencia es obligatorio")
		TipoLicencia tipoLicencia,

		@NotNull(message = "La fecha hasta es obligatoria")
		LocalDate nuevoHasta,

		String descripcion
) {
}



