package com.gestion.escuela.gestion_escolar.controllers.exceptions;

import java.time.LocalDateTime;

public record ApiError(
		LocalDateTime timestamp,
		int status,
		String error,
		String message,
		String path
) {
}