package com.gestion.escuela.gestion_escolar.controllers.escuela;

import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.request.CursoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.curso.response.CursoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.CursoMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import com.gestion.escuela.gestion_escolar.services.CursoService;
import com.gestion.escuela.gestion_escolar.web.PaginationUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/cursos")
@AllArgsConstructor
public class EscuelaCursoControllerREST {

	private final CursoService cursoService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CursoDetalleDTO crear(
			@PathVariable Long escuelaId,
			@Valid @RequestBody CursoDTO dto
	) {
		Curso curso = cursoService.crear(escuelaId, CursoMapper.toEntity(dto));
		return CursoMapper.toResponse(curso);
	}

	@PostMapping("/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<CursoDTO> cursosDTOs
	) {
		List<Curso> cursos = cursosDTOs.stream()
				.map(CursoMapper::toEntity)
				.toList();

		cursoService.crearBatch(escuelaId, cursos);
	}

	@PutMapping("/{cursoId}")
	public CursoDetalleDTO actualizar(
			@PathVariable Long escuelaId,
			@PathVariable Long cursoId,
			@Valid @RequestBody CursoDTO dto
	) {
		Curso curso = cursoService.actualizar(
				escuelaId,
				cursoId,
				dto.anio(),
				dto.grado(),
				dto.turno());

		return CursoMapper.toResponse(curso);
	}

	@DeleteMapping("/{cursoId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void eliminar(
			@PathVariable Long escuelaId,
			@PathVariable Long cursoId
	) {
		cursoService.eliminar(escuelaId, cursoId);
	}

	@GetMapping
	public PageResponse<CursoDetalleDTO> listar(
			@PathVariable Long escuelaId,
			@RequestParam(name = "turno", required = false) Turno turno,
			Pageable pageable
	) {
		Pageable limitedPageable = PaginationUtils.limit(pageable);
		Page<Curso> cursos = cursoService.listarCursosPorEscuela(escuelaId, turno, limitedPageable);

		return PageMapper.toPageResponse(cursos, CursoMapper::toResponse);
	}

}
