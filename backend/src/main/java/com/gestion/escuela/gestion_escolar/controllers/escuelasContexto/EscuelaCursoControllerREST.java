package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoUpdateDTO;
import com.gestion.escuela.gestion_escolar.mappers.CursoMapper;
import com.gestion.escuela.gestion_escolar.mappers.PageMapper;
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
	public CursoResponseDTO crearCurso(
			@PathVariable Long escuelaId,
			@Valid @RequestBody CursoCreateDTO dto
	) {

		Curso curso = cursoService.crear(escuelaId, CursoMapper.toEntity(dto));

		return CursoMapper.toResponse(curso);

	}

	@PostMapping("/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearCursosBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<CursoCreateDTO> cursosDTOs
	) {

		List<Curso> cursos = cursosDTOs.stream()
				.map(CursoMapper::toEntity)
				.toList();

		cursoService.crearBatch(escuelaId, cursos);

	}

	@PutMapping("/{cursoId}")
	public CursoResponseDTO actualizarCurso(
			@PathVariable Long escuelaId,
			@PathVariable Long cursoId,
			@Valid @RequestBody CursoUpdateDTO dto
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
	public void eliminarCurso(
			@PathVariable Long escuelaId,
			@PathVariable Long cursoId
	) {

		cursoService.eliminar(escuelaId, cursoId);

	}

	@GetMapping
	public PageResponse<CursoResponseDTO> listarCursosPorEscuela(
			@PathVariable Long escuelaId,
			@RequestParam(name = "turno", required = false) Turno turno,
			Pageable pageable
	) {

		Pageable limitedPageable = PaginationUtils.limit(pageable);

		Page<Curso> cursos = cursoService.listarCursosPorEscuela(escuelaId, turno, limitedPageable);

		return PageMapper.toPageResponse(cursos, CursoMapper::toResponse);
	}

	@GetMapping("/nombres")
	public List<CursoNombreDTO> listarCursosPorEscuela(
			@PathVariable Long escuelaId
	) {
		return cursoService.listarCursosPorEscuela(escuelaId)
				.stream()
				.map(CursoMapper::toNombreDTO)
				.toList();
	}

}
