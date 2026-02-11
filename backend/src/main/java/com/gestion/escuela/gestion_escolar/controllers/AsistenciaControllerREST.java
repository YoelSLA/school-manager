package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.EliminarInasistenciasManualDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.EmpleadoAsistenciaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.RegistrarInasistenciasManualDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.RolCount;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.services.AsistenciaService;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
@RequiredArgsConstructor
public class AsistenciaControllerREST {

	private final AsistenciaService asistenciaService;
	private final EmpleadoEducativoService empleadoEducativoService;

	@PostMapping("/manual")
	public ResponseEntity<Void> registrarInasistenciasManual(
			@Valid @RequestBody RegistrarInasistenciasManualDTO request
	) {
		EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(request.empleadoId());
		asistenciaService.registrarInasistenciasManuales(
				empleado,
				request.fechas(),
				request.tipoLicencia(),   // ⬅️ obligatorio, nunca null
				request.observacion()
		);

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}


	@GetMapping("/roles")
	public List<RolCount> obtenerRolesVigentes(
			@RequestParam("fecha")
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate fecha
	) {

		System.out.println(fecha);


		List<RolCount> roles =
				asistenciaService.contarEmpleadosPorRolVigente(fecha)
						.stream()
						.map(r -> new RolCount(
								r.rol(),
								r.rol().getLabel(),
								r.cantidad()
						))
						.toList();

		System.out.println(roles);

		return roles;
	}

	@GetMapping("/empleados")
	public List<EmpleadoAsistenciaDTO> buscarEmpleados(
			@RequestParam LocalDate fecha,
			@RequestParam(required = false) List<RolEducativo> roles,
			@RequestParam(required = false) String q
	) {
		return asistenciaService
				.buscarEmpleados(fecha, roles, q)
				.stream()
				.map(e -> EmpleadoAsistenciaDTO.from(e, fecha))
				.toList();
	}

	@DeleteMapping("/manual")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void eliminarInasistenciasManual(
			@Valid @RequestBody EliminarInasistenciasManualDTO request
	) {
		asistenciaService.eliminarInasistenciasManual(
				request.empleadoId(),
				request.fechas()
		);
	}

}

