package com.gestion.escuela.gestion_escolar.controllers.exceptions;

import com.gestion.escuela.gestion_escolar.models.exceptions.EscuelaDuplicadaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EscuelaNoEncontradaException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(EscuelaNoEncontradaException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorResponse manejarNoEncontrada(EscuelaNoEncontradaException ex) {
		return new ErrorResponse(ex.getMessage());
	}

	@ExceptionHandler(EscuelaDuplicadaException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	public ErrorResponse manejarDuplicada(EscuelaDuplicadaException ex) {
		return new ErrorResponse(ex.getMessage());
	}

	// 🔹 ERRORES DE NEGOCIO (los que vos tirás)
	@ExceptionHandler(ResponseStatusException.class)
	public ResponseEntity<Map<String, Object>> handleResponseStatusException(
			ResponseStatusException ex
	) {
		String message = ex.getReason() != null
				? ex.getReason()
				: "Error de la solicitud";

		return ResponseEntity
				.status(ex.getStatusCode())
				.body(Map.of(
						"timestamp", LocalDateTime.now(),
						"status", ex.getStatusCode().value(),
						"error", message
				));
	}

	// 🔹 ERRORES DE VALIDACIÓN (@Valid)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {

		List<Map<String, String>> errors = ex.getBindingResult()
				.getFieldErrors()
				.stream()
				.map(error -> Map.of(
						"field", error.getField(),
						"message",
						Optional.ofNullable(error.getDefaultMessage())
								.orElse("Valor inválido")
				))
				.toList();

		return ResponseEntity.badRequest().body(
				Map.of(
						"timestamp", LocalDateTime.now(),
						"status", 400,
						"error", "Error de validación",
						"exceptions", errors
				)
		);
	}

}

