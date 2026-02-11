package com.gestion.escuela.gestion_escolar.controllers.dtos;

public record ApiError(
		String code,
		String message
) {
}
