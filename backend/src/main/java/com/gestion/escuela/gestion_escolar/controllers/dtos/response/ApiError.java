package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import java.time.LocalDateTime;

public record ApiError(
		LocalDateTime timestamp,
		int status,
		String error,
		String code,
		String message,
		String path
) {}