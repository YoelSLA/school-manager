package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/empleadosEducativos")
@RequiredArgsConstructor
public class EmpleadoEducativoControllerREST {

	private final EmpleadoEducativoService empleadoEducativoService;
	private final EscuelaService escuelaService;
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
