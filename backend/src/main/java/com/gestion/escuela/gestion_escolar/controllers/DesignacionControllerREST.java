package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.EditarAsignacionDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.CubrirProvisionalDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.CubrirTitularDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos.DesignacionCursoUpdateDTO;
import com.gestion.escuela.gestion_escolar.mappers.AsignacionMapper;
import com.gestion.escuela.gestion_escolar.mappers.DesignacionMapper;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
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
	public AsignacionDetalleDTO cubrirConTitular(
			@PathVariable Long designacionId,
			@Valid @RequestBody CubrirTitularDTO dto
	) {
		Asignacion asignacion = designacionService.cubrirConTitular(
				designacionId,
				dto.empleadoId(),
				dto.fechaTomaPosesion(),
				dto.caracteristica()
		);

		System.out.println("Asignacion ID: " + asignacion.getId());

		return AsignacionMapper.toDetalle(asignacion);
	}

	@PostMapping("/{designacionId}/cubrir/provisional")
	public AsignacionDetalleDTO cubrirConProvisional(
			@PathVariable Long designacionId,
			@Valid @RequestBody CubrirProvisionalDTO dto
	) {
		return AsignacionMapper.toDetalle(
				designacionService.cubrirConProvisional(
						designacionId,
						dto.empleadoId(),
						dto.fechaTomaPosesion(),
						dto.fechaCese()
				)
		);
	}

	@GetMapping("/{designacionId}")
	public DesignacionDetalleDTO obtenerDetalle(@PathVariable Long designacionId) {
		Designacion designacion = designacionService.obtenerPorId(designacionId);
		return DesignacionMapper.toDetalle(designacion);
	}

	@GetMapping("/{designacionId}/cargo-activo")
	public ResponseEntity<AsignacionDetalleDTO> obtenerCargoActivo(
			@PathVariable Long designacionId,
			@RequestParam(required = false)
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate fecha
	) {
		LocalDate referencia = fecha != null ? fecha : LocalDate.now();

		return designacionService
				.obtenerCargoActivo(designacionId, referencia)
				.map(AsignacionMapper::toDetalle)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.noContent().build());
	}

	@GetMapping("/{designacionId}/cargos")
	public List<AsignacionDetalleDTO> obtenerOtrosCargos(
			@PathVariable Long designacionId,
			@RequestParam(required = false) EstadoAsignacion estado,
			@RequestParam(required = false)
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate fecha
	) {
		LocalDate referencia = fecha != null ? fecha : LocalDate.now();

		return designacionService
				.obtenerOtrosCargos(designacionId, estado, referencia)
				.stream()
				.map(AsignacionMapper::toDetalle)
				.toList();
	}

	@PutMapping("/{designacionId}/curso")
	public ResponseEntity<Void> actualizarDesignacionCurso(
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

		return ResponseEntity.noContent().build();
	}

	@PutMapping("/{designacionId}/administrativa")
	public ResponseEntity<Void> actualizarDesignacionAdministrativa(
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

		return ResponseEntity.noContent().build();
	}

	@PutMapping("/{designacionId}/asignaciones/{asignacionId}")
	public AsignacionDetalleDTO editarAsignacion(
			@PathVariable Long designacionId,
			@PathVariable Long asignacionId,
			@Valid @RequestBody EditarAsignacionDTO dto
	) {

		return AsignacionMapper.toDetalle(
				designacionService.editarAsignacion(
						designacionId,
						asignacionId,
						dto.empleadoId(),
						dto.fechaTomaPosesion(),
						dto.fechaCese()
				)
		);
	}


}