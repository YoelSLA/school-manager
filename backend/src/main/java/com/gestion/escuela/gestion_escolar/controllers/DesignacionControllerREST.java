package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.CubrirProvisionalDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.CubrirTitularDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.mappers.AsignacionMapper;
import com.gestion.escuela.gestion_escolar.mappers.DesignacionMapper;
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
		System.out.println("DTO");
		System.out.println(dto.empleadoId());
		System.out.println(dto.fechaTomaPosesion());
		System.out.println(dto.caracteristica());
		return AsignacionMapper.toDetalle(
				designacionService.cubrirConTitular(
						designacionId,
						dto.empleadoId(),
						dto.fechaTomaPosesion(),
						dto.caracteristica()
				)
		);
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
						dto.fechaTomaPosesion()
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


}