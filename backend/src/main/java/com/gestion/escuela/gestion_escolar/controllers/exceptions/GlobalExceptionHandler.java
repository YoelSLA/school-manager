package com.gestion.escuela.gestion_escolar.controllers.exceptions;

import com.gestion.escuela.gestion_escolar.controllers.dtos.ApiError;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoEnLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoInactivoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.escuela.EscuelaDuplicadaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.LicenciaSuperpuestaException;
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


	@ExceptionHandler(EmpleadoEnLicenciaException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	// 409
	public ApiError handleEmpleadoEnLicencia(EmpleadoEnLicenciaException ex) {
		return new ApiError(
				"EMPLEADO_EN_LICENCIA",
				ex.getMessage()
		);
	}

	@ExceptionHandler(EmpleadoInactivoException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	// 409
	public ApiError handleEmpleadoInactivo(EmpleadoInactivoException ex) {
		return new ApiError(
				"EMPLEADO_INACTIVO",
				ex.getMessage()
		);
	}


//	@ExceptionHandler(EscuelaNoEncontradaException.class)
//	@ResponseStatus(HttpStatus.NOT_FOUND)
//	public ErrorResponse manejarNoEncontrada(EscuelaNoEncontradaException ex) {
//		return new ErrorResponse(ex.getMessage());
//	}

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

	@ExceptionHandler(LicenciaSuperpuestaException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse licenciaSuperpuesta(LicenciaSuperpuestaException ex) {
		return new ErrorResponse(ex.getMessage());
	}

//	@ExceptionHandler(LicenciaNoEncontradaException.class)
//	public ResponseEntity<String> handleLicenciaNoEncontrada(
//			LicenciaNoEncontradaException ex
//	) {
//		return ResponseEntity
//				.status(HttpStatus.NOT_FOUND)
//				.body(ex.getMessage());
//	}

}

