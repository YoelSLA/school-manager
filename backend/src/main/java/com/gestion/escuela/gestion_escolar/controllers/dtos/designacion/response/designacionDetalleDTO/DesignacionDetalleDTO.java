package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionDetalleDTO;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "tipo"
)
@JsonSubTypes({
		@JsonSubTypes.Type(
				value = DesignacionAdministrativaDetalleDTO.class,
				name = "ADMINISTRATIVA"
		),
		@JsonSubTypes.Type(
				value = DesignacionCursoDetalleDTO.class,
				name = "CURSO"
		)
})
public sealed interface DesignacionDetalleDTO
		permits DesignacionAdministrativaDetalleDTO,
		DesignacionCursoDetalleDTO {
}
