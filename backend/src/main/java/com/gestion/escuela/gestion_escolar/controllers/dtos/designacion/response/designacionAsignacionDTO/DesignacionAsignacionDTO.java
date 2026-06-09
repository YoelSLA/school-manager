package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionAsignacionDTO;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "tipo"
)
@JsonSubTypes({
		@JsonSubTypes.Type(
				value = DesignacionCursoAsignacionDTO.class,
				name = "CURSO"
		),
		@JsonSubTypes.Type(
				value = DesignacionAdministrativaAsignacionDTO.class,
				name = "ADMINISTRATIVA"
		)
})
public sealed interface DesignacionAsignacionDTO
		permits DesignacionCursoAsignacionDTO,
		DesignacionAdministrativaAsignacionDTO {
}