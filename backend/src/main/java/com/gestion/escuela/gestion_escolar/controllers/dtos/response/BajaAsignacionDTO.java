package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;

import java.time.LocalDate;

public record BajaAsignacionDTO(
		LocalDate fecha,
		CausaBaja causa
) {}
