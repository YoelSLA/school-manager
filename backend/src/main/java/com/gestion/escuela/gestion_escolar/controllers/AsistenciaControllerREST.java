package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.request.EliminarInasistenciasManualDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.response.AsistenciaDiaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.response.EmpleadoAsistenciaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.response.RegistrarInasistenciasManualDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.response.RolCount;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.AsistenciaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.services.AsistenciaService;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/asistencias")
@RequiredArgsConstructor
public class AsistenciaControllerREST {

	private final AsistenciaService asistenciaService;
	private final EmpleadoEducativoService empleadoEducativoService;

	@PostMapping("/manual")
	public ResponseEntity<Void> registrarInasistenciasManual(
			@PathVariable Long escuelaId,
			@Valid @RequestBody RegistrarInasistenciasManualDTO request
	) {

		EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(
				request.empleadoId()
		);

		asistenciaService.registrarInasistenciasManuales(
				escuelaId,
				empleado,
				request.fechas(),
				request.tipoLicencia(),
				request.observacion()
		);

		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@GetMapping("/roles")
	public List<RolCount> obtenerRolesVigentes(
			@PathVariable Long escuelaId,
			@RequestParam("fecha")
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
			LocalDate fecha
	) {

		return asistenciaService.contarEmpleadosPorRolVigente(
						escuelaId,
						fecha
				)
				.stream()
				.map(r -> new RolCount(
						r.rol(),
						r.rol().getLabel(),
						r.cantidad()
				))
				.toList();
	}

	@GetMapping("/empleados")
	public PageResponse<EmpleadoAsistenciaDTO> buscarEmpleados(
			@PathVariable Long escuelaId,
			@RequestParam LocalDate fecha,
			@RequestParam(required = false) List<RolEducativo> roles,
			@RequestParam(required = false) String q,
			Pageable pageable
	) {

		int maxSize = 20;
		int pageSize = Math.min(pageable.getPageSize(), maxSize);

		Pageable limitedPageable = PageRequest.of(
				pageable.getPageNumber(),
				pageSize,
				pageable.getSort()
		);

		Page<EmpleadoEducativo> empleados = asistenciaService.buscarEmpleados(
				escuelaId,
				fecha,
				roles,
				q,
				limitedPageable
		);

		return PageMapper.toPageResponse(
				empleados,
				empleado -> EmpleadoAsistenciaDTO.from(empleado, fecha)
		);
	}

	@DeleteMapping("/manual")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void eliminarInasistenciasManual(
			@PathVariable Long escuelaId,
			@Valid @RequestBody EliminarInasistenciasManualDTO dto
	) {

		asistenciaService.eliminarInasistenciasManual(
				escuelaId,
				dto.empleadoId(),
				dto.fechas()
		);
	}

	@GetMapping("/empleados/{empleadoId}")
	public List<AsistenciaDiaDTO> obtenerAsistenciasDelMes(
			@PathVariable Long escuelaId,
			@PathVariable Long empleadoId,
			@RequestParam int anio,
			@RequestParam int mes
	) {

		YearMonth yearMonth = YearMonth.of(anio, mes);

		return asistenciaService.obtenerEstadoMensual(
						escuelaId,
						empleadoId,
						yearMonth
				)
				.stream()
				.map(AsistenciaMapper::toDiaDTO)
				.toList();
	}
}