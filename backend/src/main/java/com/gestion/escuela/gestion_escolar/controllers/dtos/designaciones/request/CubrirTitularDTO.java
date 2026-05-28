package com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.request;

import com.gestion.escuela.gestion_escolar.models.enums.TipoCaracteristicaAsignacion;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CubrirTitularDTO(

		@NotNull(message = "El empleado es obligatorio")
		Long empleadoId,

		@NotNull(message = "La fecha de toma de posesión es obligatoria")
		LocalDate fechaTomaPosesion,

		TipoCaracteristicaAsignacion caracteristica,

		Integer secuencia

) {
}