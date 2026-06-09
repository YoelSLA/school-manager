package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionLicenciaItemDTO;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "tipo"
)
@JsonSubTypes({
		@JsonSubTypes.Type(
				value = DesignacionLicenciaAdministrativaDTO.class,
				name = "ADMINISTRATIVA"
		),
		@JsonSubTypes.Type(
				value = DesignacionLicenciaCursoDTO.class,
				name = "CURSO"
		)
})
public sealed interface DesignacionLicenciaDTO
		permits DesignacionLicenciaAdministrativaDTO, DesignacionLicenciaCursoDTO {
}
