package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.*;
import com.gestion.escuela.gestion_escolar.mappers.EmpleadoEducativoMapper;
import com.gestion.escuela.gestion_escolar.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
		EmpleadoEducativo empleado =
				empleadoEducativoService.crear(
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

		// 1️⃣ Obtener entidad actual
		EmpleadoEducativo empleadoActual = empleadoEducativoService.obtenerPorEscuela(escuelaId, empleadoId);
		Set<RolEducativo> rolesEducativos = empleadoEducativoService.obtenerRolesEducativos(empleadoId);

		// 2️⃣ Mapear a nueva entidad actualizada
		EmpleadoEducativoMapper.actualizarEntidad(empleadoActual, dto);

		// 3️⃣ Delegar al service
		EmpleadoEducativo guardado = empleadoEducativoService.actualizar(empleadoActual);

		return EmpleadoEducativoMapper.toDetalle(guardado, rolesEducativos);
	}


	@PostMapping("/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearEmpleadosBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<EmpleadoEducativoCreateDTO> empleadosDTOs
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		List<EmpleadoEducativo> empleadoEducativos = empleadosDTOs.stream().
				map(dto -> EmpleadoEducativoMapper.toEntity(dto, escuela)).toList();

		empleadoEducativoService.crearBatch(empleadoEducativos);
	}

	@GetMapping
	public PageResponse<EmpleadoEducativoResumenDTO> listarPorEscuela(
			@PathVariable Long escuelaId,
			@RequestParam(required = false) String estado,
			@PageableDefault(size = 10, sort = "apellido", direction = Sort.Direction.ASC)
			Pageable pageable
	) {
		Boolean estadoFiltro = null;

		if (estado != null) {
			estadoFiltro = switch (estado) {
				case "ACTIVOS" ->
						true;
				case "INACTIVOS" ->
						false;
				default ->
						null;
			};
		}

		int MAX_SIZE = 20;
		int pageSize = Math.min(pageable.getPageSize(), MAX_SIZE);

		Pageable limitedPageable = PageRequest.of(
				pageable.getPageNumber(),
				pageSize,
				pageable.getSort()
		);

		Page<EmpleadoEducativo> empleados =
				empleadoEducativoService.listarPorEscuela(
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
	public List<EmpleadoEducativoMinimoDTO> buscarEmpleados(
			@PathVariable Long escuelaId,
			@RequestParam String search
	) {
		return empleadoEducativoService.buscarPorEscuela(escuelaId, search)
				.stream()
				.map(EmpleadoEducativoMapper::toMinimo)
				.toList();
	}


}