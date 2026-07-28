package com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoBasicoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

public record AsignacionActivaRowDTO(
		EmpleadoEducativoBasicoDTO empleadoEducativo,
		SituacionDeRevista situacionDeRevista) {}
