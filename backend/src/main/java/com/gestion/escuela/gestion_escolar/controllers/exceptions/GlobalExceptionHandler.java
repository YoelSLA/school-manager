package com.gestion.escuela.gestion_escolar.controllers.exceptions;

import com.gestion.escuela.gestion_escolar.controllers.dtos.response.ApiError;
import com.gestion.escuela.gestion_escolar.models.exceptions.*;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionSuperpuestaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaDadaDeBajaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaTieneCaracteristicaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.curso.AnioInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.curso.GradoInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.*;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoEnLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoInactivoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoNoPerteneceAEscuelaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria.RangoHorarioInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.CoberturaNoEncontradaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.CoberturaNoPerteneceALicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.FechaRenovacionInvalidaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.LicenciaSuperpuestaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.materia.CantidadModulosInvalidaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.periodo.PeriodoAbiertoException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

	private static final Logger log =
			LoggerFactory.getLogger(GlobalExceptionHandler.class);

	// =========================
	// 404 NOT FOUND
	// =========================
	@ExceptionHandler(RecursoNoEncontradoException.class)
	public ResponseEntity<ApiError> handleNotFound(
			RecursoNoEncontradoException ex,
			HttpServletRequest request
	) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(buildError(
						HttpStatus.NOT_FOUND,
						"RESOURCE_NOT_FOUND",
						ex.getMessage(),
						request
				));
	}
	// =========================
	// 409 CONFLICT
	// =========================
	@ExceptionHandler({
			RecursoDuplicadoException.class,
			AsignacionSuperpuestaException.class,
			DesignacionYaCubiertaException.class,
			LicenciaSuperpuestaException.class,
			DesignacionYaTieneTitularException.class
	})
	public ResponseEntity<ApiError> handleConflict(
			GestionEscolarException ex,
			HttpServletRequest request
	) {
		return ResponseEntity.status(HttpStatus.CONFLICT)
				.body(buildError(
						HttpStatus.CONFLICT,
						"CONFLICT",
						ex.getMessage(),
						request
				));
	}
	// =========================
	// 400 BAD REQUEST - DOMINIO
	// =========================
	@ExceptionHandler({
			AnioInvalidoException.class,
			GradoInvalidoException.class,
			RangoHorarioInvalidoException.class,
			RangoFechasInvalidoException.class,
			CantidadModulosInvalidaException.class,

			CampoObligatorioException.class,
			CuilInvalidoException.class,
			EmailInvalidoException.class,

			EstadoInvalidoException.class,
			ReglaCicloLectivoException.class,
			PeriodoAbiertoException.class,

			EmpleadoNoPerteneceAEscuelaException.class,
			EmpleadoEnLicenciaException.class,
			EmpleadoInactivoException.class,

			AsistenciaNoEditableException.class,

			AsignacionYaTieneCaracteristicaException.class,
			AsignacionYaDadaDeBajaException.class,

			DesignacionNoActivaDelEmpleadoException.class,
			DesignacionNoAfectadaPorLicenciaException.class,
			DesignacionNoVacantePorLicenciaException.class,

			CoberturaNoEncontradaException.class,
			CoberturaNoPerteneceALicenciaException.class,
			FechaRenovacionInvalidaException.class,
	})
	public ResponseEntity<ApiError> handleBadRequest(
			GestionEscolarException ex,
			HttpServletRequest request
	) {
		return ResponseEntity.badRequest()
				.body(buildError(
						HttpStatus.BAD_REQUEST,
						"BAD_REQUEST",
						ex.getMessage(),
						request
				));
	}
	// =========================
	// 400 BAD REQUEST - VALIDACION
	// =========================
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ApiError> handleValidation(
			MethodArgumentNotValidException ex,
			HttpServletRequest request
	) {

		String message = ex.getBindingResult()
				.getFieldErrors()
				.stream()
				.map(error -> error.getField() + ": " + error.getDefaultMessage())
				.collect(Collectors.joining(", "));

		return ResponseEntity.badRequest()
				.body(buildError(
						HttpStatus.BAD_REQUEST,
						"VALIDATION_ERROR",
						message,
						request
				));
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ApiError> handleConstraintViolation(
			ConstraintViolationException ex,
			HttpServletRequest request
	) {

		String message = ex.getConstraintViolations()
				.stream()
				.map(ConstraintViolation::getMessage)
				.collect(Collectors.joining(", "));

		return ResponseEntity.badRequest()
				.body(buildError(
						HttpStatus.BAD_REQUEST,
						"VALIDATION_ERROR",
						message,
						request
				));
	}

	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	public ResponseEntity<ApiError> handleTypeMismatch(
			MethodArgumentTypeMismatchException ex,
			HttpServletRequest request
	) {
		return ResponseEntity.badRequest()
				.body(buildError(
						HttpStatus.BAD_REQUEST,
						"INVALID_PARAMETER",
						"El parámetro '" + ex.getName() + "' tiene un valor inválido",
						request
				));
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<ApiError> handleIllegalArgument(
			IllegalArgumentException ex,
			HttpServletRequest request
	) {
		return ResponseEntity.badRequest()
				.body(buildError(
						HttpStatus.BAD_REQUEST,
						"INVALID_ARGUMENT",
						ex.getMessage(),
						request
				));
	}
	// =========================
	// BASE DE DATOS
	// =========================
	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<ApiError> handleDataIntegrity(
			DataIntegrityViolationException ex,
			HttpServletRequest request
	) {

		log.error("Error de integridad de datos", ex);

		return ResponseEntity.status(HttpStatus.CONFLICT)
				.body(buildError(
						HttpStatus.CONFLICT,
						"DATA_INTEGRITY_VIOLATION",
						"La operación viola restricciones de integridad de datos",
						request
				));
	}
	// =========================
	// FALLBACK
	// =========================
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiError> handleUnexpected(
			Exception ex,
			HttpServletRequest request
	) {

		log.error("Error inesperado", ex);

		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(buildError(
						HttpStatus.INTERNAL_SERVER_ERROR,
						"INTERNAL_SERVER_ERROR",
						"Ocurrió un error inesperado",
						request
				));
	}

	private ApiError buildError(
			HttpStatus status,
			String code,
			String message,
			HttpServletRequest request
	) {
		return new ApiError(
				LocalDateTime.now(),
				status.value(),
				status.getReasonPhrase(),
				code,
				message,
				request.getRequestURI()
		);
	}
}



