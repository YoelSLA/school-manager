package com.gestion.escuela.gestion_escolar.controllers.escuela;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.request.EmpleadoEducativoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.request.EmpleadoEducativoUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoConRolesDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.EmpleadoEducativoMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import com.gestion.escuela.gestion_escolar.web.PaginationUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/empleadosEducativos")
@RequiredArgsConstructor
public class EscuelaEmpleadoEducativoControllerREST {

	private final EscuelaService escuelaService;
	private final EmpleadoEducativoService empleadoEducativoService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public EmpleadoEducativoDetalleDTO crear(
			@PathVariable Long escuelaId,
			@Valid @RequestBody EmpleadoEducativoCreateDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);
		EmpleadoEducativo empleado = empleadoEducativoService.crear(
				escuelaId,
				EmpleadoEducativoMapper.toEntity(dto, escuela)
		);

		return EmpleadoEducativoMapper.toDetalle(empleado, Set.of());
	}

	@PutMapping("/{empleadoId}")
	public EmpleadoEducativoDetalleDTO actualizar(
			@PathVariable Long escuelaId,
			@PathVariable Long empleadoId,
			@Valid @RequestBody EmpleadoEducativoUpdateDTO dto
	) {
		EmpleadoEducativo empleadoActual = empleadoEducativoService.obtenerPorEscuela(escuelaId, empleadoId);
		Set<RolEducativo> rolesEducativos = empleadoEducativoService.obtenerRolesEducativos(empleadoId);

		EmpleadoEducativoMapper.actualizarEntidad(empleadoActual, dto);
		EmpleadoEducativo guardado = empleadoEducativoService.actualizar(empleadoActual);

		return EmpleadoEducativoMapper.toDetalle(guardado, rolesEducativos);
	}

	@PostMapping("/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<EmpleadoEducativoCreateDTO> empleadosDTOs
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);
		List<EmpleadoEducativo> empleadoEducativos = empleadosDTOs.stream()
				.map(dto -> EmpleadoEducativoMapper.toEntity(dto, escuela))
				.toList();

		empleadoEducativoService.crearBatch(empleadoEducativos);
	}

	@GetMapping
	public PageResponse<EmpleadoEducativoResumenDTO> listar(
			@PathVariable Long escuelaId,
			@RequestParam(required = false) String estado,
			@PageableDefault(sort = "apellido", direction = Sort.Direction.ASC) Pageable pageable
	) {
		Boolean estadoFiltro = null;
		if (estado != null) {
			estadoFiltro = switch (estado) {
				case "ACTIVOS" -> true;
				case "INACTIVOS" -> false;
				default -> null;
			};
		}

		Pageable limitedPageable = PaginationUtils.limit(pageable);
		Page<EmpleadoEducativo> empleados = empleadoEducativoService.listarPorEscuela(
				escuelaId,
				estadoFiltro,
				limitedPageable
		);

		return PageMapper.toPageResponse(
				empleados,
				e -> EmpleadoEducativoMapper.toResumen(
						e,
						empleadoEducativoService.obtenerRolesEducativos(e.getId())
				)
		);
	}

	@GetMapping(params = "search")
	public List<EmpleadoEducativoConRolesDTO> buscar(
			@PathVariable Long escuelaId,
			@RequestParam String search
	) {
		return empleadoEducativoService.buscarPorEscuela(escuelaId, search)
				.stream()
				.map(empleado -> {
					Set<RolEducativo> roles = empleadoEducativoService.obtenerRolesEducativos(empleado.getId());
					return EmpleadoEducativoMapper.toMinimoConRoles(empleado, roles);
				})
				.toList();
	}


}