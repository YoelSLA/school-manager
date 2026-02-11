package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.BajaDefinitivaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaDetalleDTO;
import com.gestion.escuela.gestion_escolar.mappers.EmpleadoEducativoMapper;
import com.gestion.escuela.gestion_escolar.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.mappers.PeriodoMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

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
				dto.descripcion()
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
				dto.fechaBaja(),
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

}
