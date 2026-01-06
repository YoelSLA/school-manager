package com.gestion.escuela.gestion_escolar.controllers.exceptions;

import java.time.LocalDateTime;

public class ErrorResponse {

	private final String mensaje;
	private final LocalDateTime timestamp;

	public ErrorResponse(String mensaje) {
		this.mensaje = mensaje;
		this.timestamp = LocalDateTime.now();
	}

	public String getMensaje() {
		return mensaje;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}
}
