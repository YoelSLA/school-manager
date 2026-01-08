package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.CubrirDesignacionDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.factory.AsignacionFactory;
import com.gestion.escuela.gestion_escolar.mappers.AsignacionMapper;
import com.gestion.escuela.gestion_escolar.mappers.DesignacionMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.services.AsignacionService;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/designaciones")
@RequiredArgsConstructor
public class DesignacionControllerREST {

	private final DesignacionService designacionService;
	private final EmpleadoEducativoService empleadoEducativoService;
	private final AsignacionService asignacionService;

	// ---------------------------------------- //
	// POST                                     //
	// ---------------------------------------- //

	@PostMapping("/{designacionId}/asignaciones")
	@ResponseStatus(HttpStatus.CREATED)
	public AsignacionDetalleDTO crear(
			@PathVariable Long designacionId,
			@Valid @RequestBody AsignacionCreateDTO dto
	) {
		try {
			EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(dto.empleadoId());
			Designacion designacion = designacionService.obtenerPorId(designacionId);

			Asignacion asignacion = AsignacionFactory.crear(
					dto.tipoAsignacion(),
					empleado,
					designacion,
					dto.fechaTomaPosesion(),
					dto.fechaCese(),
					dto.situacionDeRevista()
			);

			Asignacion creada = asignacionService.crear(asignacion);

			return AsignacionMapper.toDetalle(creada);

		} catch (
				EntityNotFoundException ex) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
		} catch (
				Exception ex) {
			throw new ResponseStatusException(
					HttpStatus.INTERNAL_SERVER_ERROR,
					"Ocurrió un error al crear la asignación",
					ex
			);
		}
	}

	@PostMapping("/{designacionId}/coberturas")
	@ResponseStatus(HttpStatus.CREATED)
	public void cubrirDesignacion(
			@PathVariable Long designacionId,
			@RequestBody @Valid CubrirDesignacionDTO dto
	) {
		designacionService.cubrirDesignacion(
				designacionId,
				dto.empleadoSuplenteId(),
				dto.fechaDesde(),
				dto.fechaHasta()
		);
	}

	// ---------------------------------------- //
	// GET                                      //
	// ---------------------------------------- //

	@GetMapping("/{designacionId}")
	public DesignacionDetalleDTO obtenerDetalle(@PathVariable Long designacionId) {
		Designacion designacion = designacionService.obtenerPorId(designacionId);
		return DesignacionMapper.toDetalle(designacion);
	}

}