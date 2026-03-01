package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.*;
import com.gestion.escuela.gestion_escolar.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import com.gestion.escuela.gestion_escolar.services.LicenciaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/licencias")
@RequiredArgsConstructor
public class LicenciaControllerREST {

	private final LicenciaService licenciaService;
	private final DesignacionService designacionService;

	@PostMapping("/{licenciaId}/coberturas")
	@ResponseStatus(HttpStatus.CREATED)
	public void cubrirDesignaciones(
			@PathVariable Long licenciaId,
			@RequestBody @Valid CubrirDesignacionesDTO dto
	) {
		designacionService.cubrirConSuplentes(licenciaId, dto.empleadoSuplenteId(), dto.designacionIds(), dto.fechaInicio());

	}

	@PostMapping("/{licenciaId}/renovaciones")
	public ResponseEntity<LicenciaDetalleDTO> renovarLicencia(
			@PathVariable Long licenciaId,
			@Valid @RequestBody RenovarLicenciaDTO request
	) {
		Licencia renovada = licenciaService.renovarLicencia(
				licenciaId,
				request.tipoLicencia(),
				request.nuevoHasta(),
				request.descripcion()
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(LicenciaMapper.toDetalle(renovada));
	}

	@GetMapping("/{licenciaId}")
	public LicenciaDetalleDTO obtenerDetalle(@PathVariable Long licenciaId) {
		Licencia licencia = licenciaService.obtenerPorId(licenciaId);
		return LicenciaMapper.toDetalle(licencia);
	}

	@GetMapping("/{licenciaId}/designaciones-afectadas")
	public List<LicenciaDesignacionDTO> obtenerDesignacionesAfectadas(
			@PathVariable Long licenciaId
	) {

		return licenciaService.obtenerDesignacionesAfectadas(licenciaId)
				.stream()
				.map(LicenciaMapper::toDesignacionDTO)
				.toList();
	}

	@GetMapping("/{licenciaId}/timeline")
	public List<LicenciaTimelineItemDTO> obtenerTimeline(
			@PathVariable Long licenciaId
	) {

		return licenciaService.obtenerTimeline(licenciaId)
				.stream()
				.map(LicenciaMapper::toTimelineItem)
				.toList();
	}

}

