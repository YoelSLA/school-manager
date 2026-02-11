package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos.DesignacionCursoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.cursos.DesignacionCursoResumenDTO;
import com.gestion.escuela.gestion_escolar.mappers.DesignacionCursoMapper;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.services.CursoService;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import com.gestion.escuela.gestion_escolar.services.MateriaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/designaciones/cursos")
@AllArgsConstructor
public class EscuelaDesignacionCursoControllerREST {

	private final EscuelaService escuelaService;
	private final DesignacionService designacionService;
	private final MateriaService materiaService;
	private final CursoService cursoService;

	@PostMapping
	public ResponseEntity<DesignacionCursoResumenDTO> crearCurso(
			@PathVariable Long escuelaId,
			@Valid @RequestBody DesignacionCursoCreateDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);
		Materia materia = materiaService.obtenerPorId(dto.materiaId());
		Curso curso = cursoService.obtenerPorId(dto.cursoId());

		DesignacionCurso designacion = DesignacionCursoMapper.toEntity(dto, escuela, curso, materia);

		DesignacionCurso creada = designacionService.crear(designacion);

		return ResponseEntity.status(HttpStatus.CREATED).body(DesignacionCursoMapper.toResumen(creada));
	}

	@PostMapping("/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearCursosBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<@Valid DesignacionCursoCreateDTO> cursosDTOs
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		List<DesignacionCurso> cursos = cursosDTOs.stream()
				.map(dto -> {
					Curso curso = cursoService.obtenerPorId(dto.cursoId());
					Materia materia = materiaService.obtenerPorId(dto.materiaId());
					return DesignacionCursoMapper.toEntity(dto, escuela, curso, materia);
				})
				.toList();

		designacionService.crearBatch(cursos);
	}

	@GetMapping
	public List<DesignacionCursoResumenDTO> listarCursos(
			@PathVariable Long escuelaId
	) {
		return designacionService.obtenerDesignacionesPorEscuela(
						escuelaId,
						DesignacionCurso.class
				)
				.stream()
				.map(DesignacionCursoMapper::toResumen)
				.toList();
	}

}