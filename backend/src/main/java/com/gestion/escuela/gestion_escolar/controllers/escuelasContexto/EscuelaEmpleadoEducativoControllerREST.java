package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoMinimoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoResumenDTO;
import com.gestion.escuela.gestion_escolar.mappers.EmpleadoEducativoMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
	public List<EmpleadoEducativoResumenDTO> listarPorEscuela(
			@PathVariable Long escuelaId,
			@RequestParam(required = false) String estado
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

		return empleadoEducativoService
				.listarPorEscuela(escuelaId, estadoFiltro)
				.stream()
				.map(e -> EmpleadoEducativoMapper.toResumen(
						e,
						empleadoEducativoService.obtenerRolesEducativos(e.getId())
				))
				.toList();
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