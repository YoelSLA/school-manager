package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResponseDTO;
import com.gestion.escuela.gestion_escolar.factory.AsignacionFactory;
import com.gestion.escuela.gestion_escolar.mappers.AsignacionMapper;
import com.gestion.escuela.gestion_escolar.mappers.DesignacionMapper;
import com.gestion.escuela.gestion_escolar.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.services.AsignacionService;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public AsignacionDetalleResponseDTO crear(
			@PathVariable Long designacionId,
			@Valid @RequestBody AsignacionCreateDTO dto
	) {
		try {
			EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(dto.getEmpleadoId());
			Designacion designacion = designacionService.obtenerPorId(designacionId);

			Asignacion asignacion = AsignacionFactory.crear(
					dto.getTipoAsignacion(),
					empleado,
					designacion,
					dto.getFechaTomaPosesion(),
					dto.getFechaCese(),
					dto.getSituacionDeRevista()
			);

			Asignacion creada = asignacionService.crear(asignacion);

			return AsignacionMapper.toResponse(creada);

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

	@PostMapping("/{designacionId}/licencias")
	@ResponseStatus(HttpStatus.CREATED)
	public LicenciaResponseDTO crearLicencia(
			@PathVariable Long designacionId,
			@Valid @RequestBody LicenciaCreateDTO dto
	) {
		Designacion designacion = designacionService.obtenerPorId(designacionId);

		Licencia licencia = designacionService.crearLicencia(
				designacion,
				dto.fechaDesde(),
				dto.fechaHasta(),
				dto.tipoLicencia(),
				dto.descripcion()
		);

		return LicenciaMapper.toResponse(licencia);
	}

	@PostMapping("/{designacionId}/licencias/{licenciaId}/cubrir")
	public ResponseEntity<Void> cubrirLicencia(
			@PathVariable Long designacionId,
			@PathVariable Long licenciaId,
			@RequestParam Long empleadoSuplenteId
	) {
		Designacion designacion = designacionService.obtenerPorId(designacionId);
		Licencia licencia = designacionService.obtenerLicenciaPorId(licenciaId);
		EmpleadoEducativo suplente = empleadoEducativoService.obtenerPorId(empleadoSuplenteId);

		designacionService.cubrirLicencia(designacion, licencia, suplente);

		return ResponseEntity.noContent().build();
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