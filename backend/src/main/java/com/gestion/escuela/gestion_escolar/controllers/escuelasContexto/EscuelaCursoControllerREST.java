package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoResponseDTO;
import com.gestion.escuela.gestion_escolar.mappers.CursoMapper;
import com.gestion.escuela.gestion_escolar.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import com.gestion.escuela.gestion_escolar.services.CursoService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import com.gestion.escuela.gestion_escolar.web.PaginationUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/cursos")
@AllArgsConstructor
public class EscuelaCursoControllerREST {

	private final CursoService cursoService;
	private final EscuelaService escuelaService;

	@PostMapping
	public ResponseEntity<CursoResponseDTO> crearCurso(
			@PathVariable Long escuelaId,
			@Valid @RequestBody CursoCreateDTO dto
	) {

		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		Curso curso = cursoService.crear(CursoMapper.toEntity(dto, escuela));

		return ResponseEntity.status(HttpStatus.CREATED).body(CursoMapper.toResponse(curso));
	}

	@PostMapping("/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearCursosBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<CursoCreateDTO> cursosDTOs
	) {

		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		List<Curso> cursos = cursosDTOs.stream()
				.map(c -> CursoMapper.toEntity(c, escuela))
				.toList();

		cursoService.crearBatch(escuelaId, cursos);
	}

	@GetMapping
	public PageResponse<CursoResponseDTO> listarCursos(
			@PathVariable Long escuelaId,
			@RequestParam(name = "turno", required = false) Turno turno,
			Pageable pageable
	) {

		Pageable limitedPageable = PaginationUtils.limit(pageable);

		Page<Curso> cursos = cursoService.buscarPorEscuela(escuelaId, turno, limitedPageable);

		return PageMapper.toPageResponse(cursos, CursoMapper::toResponse);
	}


	@GetMapping("/nombres")
	public List<CursoNombreDTO> listarNombresCursos(
			@PathVariable Long escuelaId
	) {
		return cursoService.buscarTodosPorEscuela(escuelaId)
				.stream()
				.map(CursoMapper::toNombreDTO)
				.toList();
	}

}
