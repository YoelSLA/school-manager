package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "tipo"
)
@JsonSubTypes({
		@JsonSubTypes.Type(value = CargoDesignacionCursoDTO.class, name = "CURSO"),
		@JsonSubTypes.Type(value = CargoDesignacionAdministrativaDTO.class, name = "ADMINISTRATIVA")
})
public sealed interface CargoDesignacionDTO
		permits CargoDesignacionAdministrativaDTO, CargoDesignacionCursoDTO {
}