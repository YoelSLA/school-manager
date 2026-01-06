package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionAdministrativaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos.DesignacionCursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos.DesignacionCursoResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoMinimoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.EscuelaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.EscuelaResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaResponseDTO;
import com.gestion.escuela.gestion_escolar.mappers.*;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.services.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escuelas")
@RequiredArgsConstructor
@Tag(
		name = "Escuelas",
		description = "Gestión de escuelas del sistema"
)
public class EscuelaControllerREST {

	private final EscuelaService escuelaService;
	private final DesignacionService designacionService;
	private final EmpleadoEducativoService empleadoEducativoService;
	private final MateriaService materiaService;
	private final CursoService cursoService;

	// ---------------------------------------- //
	// POST                                     //
	// ---------------------------------------- //

	@PostMapping
	public ResponseEntity<EscuelaResponseDTO> crear(@Valid @RequestBody EscuelaCreateDTO dto) {
		Escuela escuelaCreada = escuelaService.crear(EscuelaMapper.toEntity(dto));
		return ResponseEntity.status(HttpStatus.CREATED).body(EscuelaMapper.toResponse(escuelaCreada));
	}

	@PostMapping("/{escuelaId}/cursos")
	public ResponseEntity<CursoResponseDTO> crearCurso(
			@PathVariable Long escuelaId,
			@Valid @RequestBody CursoCreateDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		Curso curso = cursoService.crear(CursoMapper.toEntity(dto, escuela));

		return ResponseEntity.status(HttpStatus.CREATED).body(CursoMapper.toResponse(curso));
	}

	@PostMapping("/{escuelaId}/designaciones/administrativas")
	public ResponseEntity<DesignacionAdministrativaResumenDTO> crearAdministrativa(
			@PathVariable Long escuelaId,
			@Valid @RequestBody DesignacionAdministrativaCreateDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		DesignacionAdministrativa designacion = DesignacionAdministrativaMapper.toEntity(dto, escuela);

		DesignacionAdministrativa creada = designacionService.crearAdministrativa(designacion);

		return ResponseEntity.status(HttpStatus.CREATED).body(DesignacionAdministrativaMapper.toResumen(creada));
	}

	@PostMapping("/{escuelaId}/designaciones/cursos")
	public ResponseEntity<DesignacionCursoResumenDTO> crearCurso(
			@PathVariable Long escuelaId,
			@Valid @RequestBody DesignacionCursoCreateDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);
		Materia materia = materiaService.obtenerPorId(dto.materiaId());
		Curso curso = cursoService.obtenerPorId(dto.cursoId());

		DesignacionCurso designacion = DesignacionCursoMapper.toEntity(dto, escuela, curso, materia);

		DesignacionCurso creada = designacionService.crearCurso(designacion);

		return ResponseEntity.status(HttpStatus.CREATED).body(DesignacionCursoMapper.toResumen(creada));
	}

	@PostMapping("/{escuelaId}/empleados")
	public ResponseEntity<EmpleadoEducativoDetalleDTO> crearEmpleado(
			@PathVariable Long escuelaId,
			@Valid @RequestBody EmpleadoEducativoCreateDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);
		EmpleadoEducativo entity = EmpleadoEducativoMapper.toEntity(dto, escuela);

		EmpleadoEducativo guardado = empleadoEducativoService.crear(entity);

		return ResponseEntity.status(HttpStatus.CREATED).body(EmpleadoEducativoMapper.toDetalle(guardado));
	}

	@PostMapping("/{escuelaId}/materias")
	public ResponseEntity<MateriaResponseDTO> crearMateria(
			@PathVariable Long escuelaId,
			@Valid @RequestBody MateriaCreateDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		Materia creada = MateriaMapper.toEntity(dto, escuela);

		Materia materia = materiaService.crear(creada);

		return ResponseEntity.status(HttpStatus.CREATED).body(MateriaMapper.toResponse(materia));
	}

	// ---------------------------------------- //
	// GET                                      //
	// ---------------------------------------- //

	@GetMapping
	public List<EscuelaResponseDTO> listar() {
		return escuelaService.listarTodas()
				.stream()
				.map(EscuelaMapper::toResponse)
				.toList();
	}

	@GetMapping("/{escuelaId}/cursos")
	public List<CursoResponseDTO> listarCursos(
			@PathVariable Long escuelaId
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		return cursoService.buscarPorEscuela(escuela)
				.stream()
				.map(CursoMapper::toResponse)
				.toList();
	}

	@GetMapping("/{escuelaId}/designaciones/administrativas")
	public List<DesignacionAdministrativaResumenDTO> listarDesignacionesAdministrativas(
			@PathVariable Long escuelaId
	) {
		return escuelaService.obtenerDesignacionesAdministrativas(escuelaId)
				.stream()
				.map(DesignacionAdministrativaMapper::toResumen)
				.toList();
	}

	@GetMapping("/{escuelaId}/designaciones/administrativas/{designacionId}")
	public DesignacionAdministrativaDetalleDTO obtenerCompleta(
			@PathVariable Long escuelaId,
			@PathVariable Long designacionId
	) {

		DesignacionAdministrativa designacionObtenida = designacionService.obtenerAdministrativaPorEscuela(
				escuelaId,
				designacionId
		);

		return DesignacionAdministrativaMapper.toDetalle(designacionObtenida);
	}

	@GetMapping("/{escuelaId}/designaciones/cursos")
	public List<DesignacionCursoResumenDTO> listarDesignacionesCursos(
			@PathVariable Long escuelaId
	) {
		return escuelaService.obtenerDesignacionesCursos(escuelaId)
				.stream()
				.map(DesignacionCursoMapper::toResumen)
				.toList();
	}

	@GetMapping(value = "/{escuelaId}/empleados", params = "search")
	public List<EmpleadoEducativoMinimoDTO> buscarEmpleados(
			@PathVariable Long escuelaId,
			@RequestParam String search
	) {
		return empleadoEducativoService.buscarPorEscuela(escuelaId, search)
				.stream()
				.map(EmpleadoEducativoMapper::toMinimo)
				.toList();
	}

	@GetMapping(value = "/{escuelaId}/empleados", params = "!search")
	public ResponseEntity<List<EmpleadoEducativoResumenDTO>> listarEmpleados(
			@PathVariable Long escuelaId
	) {
		List<EmpleadoEducativo> empleados = escuelaService.listarEmpleadosEducativos(escuelaId);

		System.out.println("HOLA ANTES DEL RESPONSE");

		List<EmpleadoEducativoResumenDTO> response =
				empleados.stream()
						.map(EmpleadoEducativoMapper::toResumen)
						.toList();

		System.out.println("HOLA DESPUES DEL RESPONSE");
		System.out.println(response);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{escuelaId}/materias")
	public List<MateriaResponseDTO> listarMaterias(
			@PathVariable Long escuelaId
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		return materiaService.buscarPorEscuela(escuela)
				.stream()
				.map(MateriaMapper::toResponse)
				.toList();
	}

	@GetMapping("/{escuelaId}/licencias")
	public List<LicenciaResponseDTO> listarLicencias(
			@PathVariable Long escuelaId
	) {
		return escuelaService.obtenerLicencias(escuelaId)
				.stream()
				.map(LicenciaMapper::toResponse)
				.toList();
	}

}

//
//	@Operation(
//			summary = "Crear una escuela",
//			description = "Crea una nueva escuela y la deja activa por defecto"
//	)
//	@ApiResponses({
//			@ApiResponse(
//					responseCode = "201",
//					description = "Escuela creada correctamente",
//					content = @Content(schema = @Schema(implementation = EscuelaResponseDTO.class))
//			),
//			@ApiResponse(
//					responseCode = "400",
//					description = "Datos inválidos"
//			)
//	})
//	@PostMapping
//	public ResponseEntity<EscuelaResponseDTO> crear(@Valid @RequestBody EscuelaCreateDTO dto) {
//		Escuela escuelaACrear = EscuelaMapper.toEntity(dto);
//		Escuela escuelaCreada = escuelaService.crear(escuelaACrear);
//
//		return ResponseEntity.status(HttpStatus.CREATED).body(EscuelaMapper.toResponse(escuelaCreada));
//	}
//
//	@Operation(
//			summary = "Listar escuelas activas",
//			description = "Obtiene todas las escuelas activas del sistema"
//	)
//	@ApiResponse(
//			responseCode = "200",
//			description = "Listado de escuelas activas"
//	)
//	@GetMapping
//	public List<EscuelaResponseDTO> listarActivas() {
//		return escuelaService.listarActivas()
//				.stream()
//				.map(EscuelaMapper::toResponse)
//				.toList();
//	}
//
//	@Operation(
//			summary = "Listar todas las escuelas",
//			description = "Obtiene todas las escuelas, activas e inactivas"
//	)
//	@ApiResponse(
//			responseCode = "200",
//			description = "Listado completo de escuelas"
//	)
//	@GetMapping("/todas")
//	public List<EscuelaResponseDTO> listarTodas() {
//		return escuelaService.listarTodas()
//				.stream()
//				.map(EscuelaMapper::toResponse)
//				.toList();
//	}
//
//	@Operation(
//			summary = "Obtener escuela por nombre",
//			description = "Busca una escuela por su nombre único"
//	)
//	@ApiResponses({
//			@ApiResponse(
//					responseCode = "200",
//					description = "Escuela encontrada",
//					content = @Content(schema = @Schema(implementation = EscuelaResponseDTO.class))
//			),
//			@ApiResponse(
//					responseCode = "404",
//					description = "Escuela no encontrada"
//			)
//	})
//	@GetMapping("/{nombre}")
//	public EscuelaResponseDTO obtener(@PathVariable String nombre) {
//
//		return EscuelaMapper.toResponse(escuelaService.obtenerPorNombre(nombre));
//	}
//
//	@Operation(
//			summary = "Desactivar escuela",
//			description = "Marca una escuela como inactiva sin eliminarla"
//	)
//	@ApiResponses({
//			@ApiResponse(responseCode = "204", description = "Escuela desactivada"),
//			@ApiResponse(responseCode = "404", description = "Escuela no encontrada")
//	})
//	@PutMapping("/{nombre}/desactivar")
//	@ResponseStatus(HttpStatus.NO_CONTENT)
//	public void desactivar(@PathVariable String nombre) {
//		escuelaService.desactivarPorNombre(nombre);
//	}
//
//	@Operation(
//			summary = "Activar escuela",
//			description = "Vuelve a activar una escuela previamente desactivada"
//	)
//	@ApiResponses({
//			@ApiResponse(responseCode = "204", description = "Escuela activada"),
//			@ApiResponse(responseCode = "404", description = "Escuela no encontrada")
//	})
//	@PutMapping("/{nombre}/activar")
//	@ResponseStatus(HttpStatus.NO_CONTENT)
//	public void activar(@PathVariable String nombre) {
//		escuelaService.activarPorNombre(nombre);
//	}
//
//	@Operation(
//			summary = "Actualizar escuela",
//			description = "Actualiza los datos de una escuela existente"
//	)
//	@ApiResponses({
//			@ApiResponse(
//					responseCode = "200",
//					description = "Escuela actualizada",
//					content = @Content(schema = @Schema(implementation = EscuelaResponseDTO.class))
//			),
//			@ApiResponse(
//					responseCode = "400",
//					description = "Datos inválidos"
//			),
//			@ApiResponse(
//					responseCode = "404",
//					description = "Escuela no encontrada"
//			)
//	})
//	@PutMapping("/{nombre}")
//	public EscuelaResponseDTO actualizar(@PathVariable String nombre, @Valid @RequestBody EscuelaUpdateDTO dto
//	) {
//		System.out.println("HOLA ENTRE ");
//		System.out.println(nombre);
//		Escuela datosActualizados = EscuelaMapper.toEntity(dto);
//
//		Escuela escuelaActualizada = escuelaService.actualizarPorNombre(nombre, datosActualizados);
//
//		return EscuelaMapper.toResponse(escuelaActualizada);
//	}



