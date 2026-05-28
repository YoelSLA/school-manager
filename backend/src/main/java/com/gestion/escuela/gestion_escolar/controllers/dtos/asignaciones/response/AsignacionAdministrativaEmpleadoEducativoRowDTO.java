package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.response.DesignacionAdministrativaAsignacionDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.BajaAsignacionDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

public record AsignacionAdministrativaEmpleadoEducativoRowDTO(
		Long id,
		PeriodoDTO periodo,
		SituacionDeRevista situacionDeRevista,
		EstadoAsignacion estadoAsignacion,
		BajaAsignacionDTO baja,
		DesignacionAdministrativaAsignacionDTO designacion
) implements AsignacionEmpleadoEducativoRowDTO { }
