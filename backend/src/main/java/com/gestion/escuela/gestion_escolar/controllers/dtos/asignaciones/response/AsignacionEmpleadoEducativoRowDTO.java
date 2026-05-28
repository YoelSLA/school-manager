package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.response;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "tipo"
)
@JsonSubTypes({
		@JsonSubTypes.Type(
				value = AsignacionCursoEmpleadoEducativoRowDTO.class,
				name = "CURSO"
		),
		@JsonSubTypes.Type(
				value = AsignacionAdministrativaEmpleadoEducativoRowDTO.class,
				name = "ADMINISTRATIVA"
		)
})
public sealed interface AsignacionEmpleadoEducativoRowDTO
		permits AsignacionCursoEmpleadoEducativoRowDTO,
		AsignacionAdministrativaEmpleadoEducativoRowDTO {
}