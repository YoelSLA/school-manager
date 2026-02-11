package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.cursos.CursoResponseDTO;
import com.gestion.escuela.gestion_escolar.mappers.CursoMapper;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import com.gestion.escuela.gestion_escolar.services.CursoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/cursos")
@AllArgsConstructor
public class EscuelaCursoControllerREST {

	private final CursoService cursoService;

	@PostMapping
	public ResponseEntity<CursoResponseDTO> crearCurso(
			@PathVariable Long escuelaId,
			@Valid @RequestBody CursoCreateDTO dto
	) {

		Curso curso = cursoService.crear(CursoMapper.toEntity(dto), escuelaId);

		return ResponseEntity.status(HttpStatus.CREATED).body(CursoMapper.toResponse(curso));
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

	@GetMapping
	public List<CursoResponseDTO> listarCursos(
			@PathVariable Long escuelaId,
			@RequestParam(name = "turno", required = false) Turno turno
	) {
		return cursoService.buscarPorEscuela(escuelaId, turno)
				.stream()
				.map(CursoMapper::toResponse)
				.toList();
	}

	@GetMapping("/nombres")
	public List<CursoNombreDTO> listarNombresCursos(
			@PathVariable Long escuelaId
	) {
		return cursoService.buscarPorEscuela(escuelaId)
				.stream()
				.map(CursoMapper::toNombreDTO)
				.toList();
	}

}
