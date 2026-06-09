package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.request.EliminarInasistenciasManualDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.request.RegistrarInasistenciasManualDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.response.AsistenciaDiaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.response.AsistenciaEmpleadoResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.AsistenciaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.records.EmpleadoAsistenciaResumen;
import com.gestion.escuela.gestion_escolar.models.records.RolCount;
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

	@PostMapping
	public ResponseEntity<Void> registrarInasistencias(
			@PathVariable Long escuelaId,
			@Valid @RequestBody RegistrarInasistenciasManualDTO request
	) {

		EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(
				request.empleadoId()
		);

		asistenciaService.registrarInasistencias(
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
	public PageResponse<AsistenciaEmpleadoResumenDTO> buscarEmpleados(
			@PathVariable Long escuelaId,
			@RequestParam LocalDate fecha,
			@RequestParam(required = false) List<RolEducativo> roles,
			@RequestParam(required = false) String q,
			Pageable pageable
	) {

		int maxSize = 20;

		Pageable limitedPageable = PageRequest.of(
				pageable.getPageNumber(),
				Math.min(pageable.getPageSize(), maxSize),
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
				empleado -> {
					EmpleadoAsistenciaResumen resumen =
							asistenciaService.getResumenAsistenciaEmpleado(
									empleado,
									fecha
							);
					return AsistenciaMapper.toResumenDTO(
							empleado,
							resumen
					);
				}
		);
	}

	@DeleteMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void eliminarInasistencias(
			@PathVariable Long escuelaId,
			@Valid @RequestBody EliminarInasistenciasManualDTO dto
	) {

		asistenciaService.eliminarInasistencias(
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

		return asistenciaService.obtenerEstadoAsistenciaMensual(
						escuelaId,
						empleadoId,
						yearMonth
				)
				.stream()
				.map(AsistenciaMapper::toDiaDTO)
				.toList();
	}
}