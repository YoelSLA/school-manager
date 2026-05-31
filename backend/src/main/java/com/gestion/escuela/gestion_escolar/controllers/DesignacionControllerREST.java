package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.request.AsignacionUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.CubrirProvisionalDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.CubrirTitularDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionAdministrativaUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionCursoUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.mappers.AsignacionMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.DesignacionMapper;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/designaciones")
@RequiredArgsConstructor
public class DesignacionControllerREST {

	private final DesignacionService designacionService;

	@PostMapping("/{designacionId}/cubrir/titular")
	@ResponseStatus(HttpStatus.CREATED)
	public AsignacionDetalleDTO cubrirConTitular(
			@PathVariable Long designacionId,
			@Valid @RequestBody CubrirTitularDTO dto
	) {
		Asignacion asignacion = designacionService.cubrirConTitular(
				designacionId,
				dto.empleadoId(),
				dto.fechaTomaPosesion(),
				dto.caracteristica(),
				dto.secuencia()
		);

		return AsignacionMapper.toDetalle(asignacion);
	}

	@PostMapping("/{designacionId}/cubrir/provisional")
	@ResponseStatus(HttpStatus.CREATED)
	public AsignacionDetalleDTO cubrirConProvisional(
			@PathVariable Long designacionId,
			@Valid @RequestBody CubrirProvisionalDTO dto
	) {
		Asignacion asignacion = designacionService.cubrirConProvisional(
				designacionId,
				dto.empleadoId(),
				dto.fechaTomaPosesion(),
				dto.fechaCese(),
				dto.secuencia()
		);

		return AsignacionMapper.toDetalle(asignacion);
	}

	@GetMapping("/{designacionId}")
	@ResponseStatus(HttpStatus.OK)
	public DesignacionDetalleDTO obtenerDetalle(@PathVariable Long designacionId) {
		Designacion designacion = designacionService.obtenerPorId(designacionId);
		return DesignacionMapper.toDetalle(designacion);
	}

	@GetMapping("/{designacionId}/cargo-activo")
	public ResponseEntity<AsignacionDetalleDTO> obtenerCargoActivo(
			@PathVariable Long designacionId
	) {
		return designacionService
				.obtenerCargoActivo(designacionId)
				.map(AsignacionMapper::toDetalle)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.noContent().build());
	}

	@GetMapping("/{designacionId}/cargos")
	@ResponseStatus(HttpStatus.OK)
	public List<AsignacionDetalleDTO> obtenerOtrosCargos(
			@PathVariable Long designacionId,
			@RequestParam(required = false) EstadoAsignacion estado,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha
	) {
		LocalDate referencia = fecha != null ? fecha : LocalDate.now();

		return designacionService
				.obtenerOtrosCargos(designacionId, estado, referencia)
				.stream()
				.map(AsignacionMapper::toDetalle)
				.toList();
	}

	@PutMapping("/{designacionId}/curso")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void actualizarDesignacionCurso(
			@PathVariable Long designacionId,
			@Valid @RequestBody DesignacionCursoUpdateDTO dto
	) {

		Set<FranjaHoraria> franjas = dto.franjasHorarias()
				.stream()
				.map(f -> new FranjaHoraria(
						f.dia(),
						f.horaDesde(),
						f.horaHasta()
				))
				.collect(Collectors.toSet());

		designacionService.actualizarDesignacionCurso(
				designacionId,
				dto.cupof(),
				dto.materiaId(),
				dto.cursoId(),
				dto.orientacion(),
				franjas
		);
	}

	@PutMapping("/{designacionId}/administrativa")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void actualizarDesignacionAdministrativa(
			@PathVariable Long designacionId,
			@Valid @RequestBody DesignacionAdministrativaUpdateDTO dto
	) {

		Set<FranjaHoraria> franjas = dto.franjasHorarias()
				.stream()
				.map(f -> new FranjaHoraria(
						f.dia(),
						f.horaDesde(),
						f.horaHasta()
				))
				.collect(Collectors.toSet());

		designacionService.actualizarDesignacionAdministrativa(
				designacionId,
				dto.cupof(),
				dto.rolEducativo(),
				franjas
		);
	}

	@PutMapping("/{designacionId}/asignaciones/{asignacionId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public AsignacionDetalleDTO actualizarAsignacion(
			@PathVariable Long designacionId,
			@PathVariable Long asignacionId,
			@Valid @RequestBody AsignacionUpdateDTO dto
	) {
		Asignacion asignacion = designacionService.actualizarAsignacion(
				designacionId,
				asignacionId,
				dto.empleadoId(),
				dto.fechaTomaPosesion(),
				dto.fechaCese(),
				dto.secuencia()
		);

		return AsignacionMapper.toDetalle(asignacion);
	}

	@DeleteMapping("/{designacionId}/asignaciones/{asignacionId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void eliminarAsignacion(
			@PathVariable Long designacionId,
			@PathVariable Long asignacionId
	) {
		designacionService.eliminarAsignacion(designacionId, asignacionId);
	}


}