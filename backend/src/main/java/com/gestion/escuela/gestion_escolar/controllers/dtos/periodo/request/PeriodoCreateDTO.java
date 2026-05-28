package com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.request;

public sealed interface PeriodoCreateDTO
		permits PeriodoAbiertoCreateDTO,
		PeriodoCerradoCreateDTO {
}