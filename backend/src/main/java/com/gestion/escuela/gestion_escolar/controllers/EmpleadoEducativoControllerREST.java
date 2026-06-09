package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionLicenciaItemDTO.DesignacionLicenciaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoAsignacionesDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoLicenciasDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.request.LicenciaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.request.BajaDefinitivaDTO;
import com.gestion.escuela.gestion_escolar.controllers.mappers.DesignacionMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.EmpleadoEducativoMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PeriodoMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/empleadosEducativos")
@RequiredArgsConstructor
public class EmpleadoEducativoControllerREST {

	private final EmpleadoEducativoService empleadoEducativoService;

	@PostMapping("/{empleadoId}/licencias")
	@ResponseStatus(HttpStatus.CREATED)
	public LicenciaDetalleDTO crearLicencia(
			@PathVariable Long empleadoId,
			@Valid @RequestBody LicenciaCreateDTO dto
	) {

		Licencia licencia = empleadoEducativoService.crearLicencia(
				empleadoId,
				dto.tipoLicencia(),
				PeriodoMapper.toEntity(dto.periodo()),
				dto.descripcion(),
				dto.designacionesIds()
		);

		return LicenciaMapper.toDetalle(licencia);
	}

	@PostMapping("/{empleadoId}/baja-definitiva")
	public ResponseEntity<Void> darDeBajaDefinitiva(
			@PathVariable Long empleadoId,
			@Valid @RequestBody BajaDefinitivaDTO dto
	) {
		empleadoEducativoService.darDeBajaDefinitiva(
				empleadoId,
				LocalDate.now(),
				dto.causa()
		);

		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@GetMapping("/{empleadoId}")
	public EmpleadoEducativoDetalleDTO obtenerPorId(@PathVariable Long empleadoId) {
		EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(empleadoId);
		Set<RolEducativo> rolesEducativos = empleadoEducativoService.obtenerRolesEducativos(empleadoId);
		return EmpleadoEducativoMapper.toDetalle(empleado, rolesEducativos);
	}

	@GetMapping("/{empleadoId}/designaciones-activas")
	public Set<DesignacionLicenciaDTO> obtenerDesignacionesActivas(
			@PathVariable Long empleadoId
	) {

		return empleadoEducativoService.obtenerDesignacionesActivas(empleadoId)
				.stream()
				.map(DesignacionMapper::toLicenciaItem)
				.collect(Collectors.toSet());
	}

	@GetMapping("/{empleadoId}/asignaciones")
	public EmpleadoEducativoAsignacionesDTO obtenerAsignaciones(@PathVariable Long empleadoId) {
		EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(empleadoId);
		return EmpleadoEducativoMapper.toAsignaciones(empleado);
	}

	@GetMapping("/{empleadoId}/licencias")
	public EmpleadoEducativoLicenciasDTO obtenerLicencias(@PathVariable Long empleadoId) {
		EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(empleadoId);
		return EmpleadoEducativoMapper.toLicencias(empleado);
	}

}
