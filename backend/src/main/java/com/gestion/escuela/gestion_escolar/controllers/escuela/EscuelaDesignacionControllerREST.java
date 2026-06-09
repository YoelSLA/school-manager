package com.gestion.escuela.gestion_escolar.controllers.escuela;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionAdministrativaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionCursoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionAdministrativaCardDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionCursoCardDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionCursoFilterDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionDetalleDTO.DesignacionAdministrativaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionDetalleDTO.DesignacionCursoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.DesignacionMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.services.CursoService;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import com.gestion.escuela.gestion_escolar.services.MateriaService;
import com.gestion.escuela.gestion_escolar.web.PaginationUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/designaciones")
@AllArgsConstructor
public class EscuelaDesignacionControllerREST {

	private final EscuelaService escuelaService;
	private final DesignacionService designacionService;
	private final MateriaService materiaService;
	private final CursoService cursoService;

	@PostMapping("/administrativas")
	@ResponseStatus(HttpStatus.CREATED)
	public DesignacionAdministrativaDetalleDTO crearAdministrativa(
			@PathVariable Long escuelaId,
			@Valid @RequestBody DesignacionAdministrativaDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);
		DesignacionAdministrativa designacion = DesignacionMapper.toEntity(dto, escuela);
		DesignacionAdministrativa creada = designacionService.crear(designacion);

		return DesignacionMapper.toDetalle(creada);
	}

	@PostMapping("/administrativas/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearAdministrativasBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<DesignacionAdministrativaDTO> administrativasDTOs
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);
		List<DesignacionAdministrativa> administrativas = administrativasDTOs.stream()
				.map(dto -> DesignacionMapper.toEntity(dto, escuela))
				.toList();

		designacionService.crearBatch(administrativas);
	}


	@GetMapping("/administrativas")
	public PageResponse<DesignacionAdministrativaCardDTO> listarAdministrativas(
			@PathVariable Long escuelaId,
			Pageable pageable
	) {
		Pageable limitedPageable = PaginationUtils.limit(pageable);
		Page<DesignacionAdministrativa> designaciones =
				designacionService.obtenerDesignacionesAdministrativasPorEscuela(
						escuelaId,
						limitedPageable
				);

		return PageMapper.toPageResponse(designaciones, DesignacionMapper::toResumen);
	}

	@PostMapping("/cursos")
	@ResponseStatus(HttpStatus.CREATED)
	public DesignacionCursoDetalleDTO crearCurso(
			@PathVariable Long escuelaId,
			@Valid @RequestBody DesignacionCursoDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);
		Materia materia = materiaService.obtenerPorId(dto.materiaId());
		Curso curso = cursoService.obtenerPorId(dto.cursoId());

		DesignacionCurso designacion = DesignacionMapper.toEntity(dto, escuela, curso, materia, dto.orientacion());
		DesignacionCurso creada = designacionService.crear(designacion);

		return DesignacionMapper.toDetalle(creada);
	}

	@PostMapping("/cursos/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearCursosBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<@Valid DesignacionCursoDTO> cursosDTOs
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);
		List<DesignacionCurso> cursos = cursosDTOs.stream()
				.map(dto -> {
					Curso curso = cursoService.obtenerPorId(dto.cursoId());
					Materia materia = materiaService.obtenerPorId(dto.materiaId());
					return DesignacionMapper.toEntity(dto, escuela, curso, materia, dto.orientacion());
				})
				.toList();

		designacionService.crearBatch(cursos);
	}

	@GetMapping("/cursos")
	public PageResponse<DesignacionCursoCardDTO> listarCursos(
			@PathVariable Long escuelaId,
			DesignacionCursoFilterDTO filter,
			Pageable pageable
	) {
		Pageable limitedPageable = PaginationUtils.limit(pageable);
		Page<DesignacionCurso> designaciones =
				designacionService.obtenerDesignacionesCursoPorEscuela(
						escuelaId,
						filter,
						limitedPageable
				);

		return PageMapper.toPageResponse(designaciones, DesignacionMapper::toResumen);
	}
}
