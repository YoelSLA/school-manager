package com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.request;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "tipo"
)
@JsonSubTypes({
		@JsonSubTypes.Type(
				value = PeriodoAbiertoCreateDTO.class,
				name = "ABIERTO"
		),
		@JsonSubTypes.Type(
				value = PeriodoCerradoCreateDTO.class,
				name = "CERRADO"
		)
})
public sealed interface PeriodoCreateDTO
		permits PeriodoAbiertoCreateDTO,
		PeriodoCerradoCreateDTO {
}