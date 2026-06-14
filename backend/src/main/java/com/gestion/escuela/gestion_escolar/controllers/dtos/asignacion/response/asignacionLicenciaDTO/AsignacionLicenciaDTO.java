package com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "tipo"
)
@JsonSubTypes({
		@JsonSubTypes.Type(
				value = AsignacionLicenciaAdministrativaDTO.class,
				name = "ADMINISTRATIVA"
		),
		@JsonSubTypes.Type(
				value = AsignacionLicenciaCursoDTO.class,
				name = "CURSO"
		)
})
public sealed interface AsignacionLicenciaDTO
		permits AsignacionLicenciaAdministrativaDTO,
		AsignacionLicenciaCursoDTO {

	Long id();
	Integer secuencia();
	Integer cupof();
	RolEducativo rolEducativo();
	SituacionDeRevista situacionDeRevista();
	PeriodoDTO periodo();
}
