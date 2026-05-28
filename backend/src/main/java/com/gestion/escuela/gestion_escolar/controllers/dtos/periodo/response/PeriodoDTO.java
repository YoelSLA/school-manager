package com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response;

public sealed interface PeriodoDTO
		permits PeriodoAbiertoDTO,
		PeriodoCerradoDTO {
}
