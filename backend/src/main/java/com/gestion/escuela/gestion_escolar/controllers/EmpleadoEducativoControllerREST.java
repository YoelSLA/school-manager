package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaDetalleDTO;
import com.gestion.escuela.gestion_escolar.mappers.AsignacionMapper;
import com.gestion.escuela.gestion_escolar.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleadosEducativos")
@RequiredArgsConstructor
public class EmpleadoEducativoControllerREST {

	private final EmpleadoEducativoService empleadoEducativoService;

	@PostMapping("/{empleadoId}/licencias")
	@ResponseStatus(HttpStatus.CREATED)
	public LicenciaDetalleDTO crearLicencia(
			@PathVariable Long empleadoId,
			@Valid @RequestBody LicenciaCreateDTO request
	) {
		Licencia licencia = empleadoEducativoService.crearLicencia(
				empleadoId,
				request.tipoLicencia(),
				request.fechaDesde(),
				request.fechaHasta(),
				request.descripcion()
		);

		return LicenciaMapper.toDetalle(licencia);
	}

	@GetMapping("/{empleadoId}/asignaciones-activas")
	public List<AsignacionDetalleDTO> obtenerAsignacionesActivas(
			@PathVariable Long empleadoId
	) {
		return empleadoEducativoService
				.obtenerAsignacionesActivas(empleadoId)
				.stream()
				.map(AsignacionMapper::toDetalle)
				.toList();
	}

}
//	@GetMapping
//	public List<EmpleadoEducativoDetalleDTO> getAllEmpleadosEducativos() {
//		return empleadoEducativoService.listar()
//				.stream()
//				.map(EmpleadoEducativoMapper::toResponse)
//				.toList();
//	}
//
//	@GetMapping("/existe-cuil")
//	public ResponseEntity<Boolean> existeCuil(
//			@RequestParam String cuil) {
//
//		boolean existe = empleadoEducativoService.existeCuil(cuil);
//		return ResponseEntity.ok(existe);
//	}
//
////  @PutMapping("/cuil/{cuilActual}")
////  public ResponseEntity<EmpleadoEducativo> actualizarPorCuil(@PathVariable String cuilActual,
////          @Valid @RequestBody EmpleadoEducativoUpdateDTO dto
////  ) {
////    EmpleadoEducativo actualizado = empleadoEducativoService.actualizarPorCuil(cuilActual, dto);
////
////    return ResponseEntity.ok(actualizado);
////  }
//
//	@DeleteMapping("/cuil/{cuil}")
//	public ResponseEntity<Void> eliminarPorCuil(
//			@PathVariable String cuil
//	) {
//		empleadoEducativoService.eliminarPorCuil(cuil);
//		return ResponseEntity.noContent().build(); // 204
//	}
//
