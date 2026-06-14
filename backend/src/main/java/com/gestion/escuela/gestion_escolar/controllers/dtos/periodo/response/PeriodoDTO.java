package com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "tipo"
)
@JsonSubTypes({
		@JsonSubTypes.Type(
				value = PeriodoAbiertoDTO.class,
				name = "ABIERTO"
		),
		@JsonSubTypes.Type(
				value = PeriodoCerradoDTO.class,
				name = "CERRADO"
		)
})
public sealed interface PeriodoDTO
		permits PeriodoAbiertoDTO,
		PeriodoCerradoDTO {
}
