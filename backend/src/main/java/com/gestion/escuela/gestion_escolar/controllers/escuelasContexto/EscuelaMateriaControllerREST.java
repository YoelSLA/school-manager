package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaResponseDTO;
import com.gestion.escuela.gestion_escolar.mappers.MateriaMapper;
import com.gestion.escuela.gestion_escolar.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.services.MateriaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/materias")
@AllArgsConstructor
public class EscuelaMateriaControllerREST {

	private final MateriaService materiaService;

	@PostMapping
	public ResponseEntity<MateriaResponseDTO> crearMateria(
			@PathVariable Long escuelaId,
			@Valid @RequestBody MateriaCreateDTO dto
	) {

		Materia creada = MateriaMapper.toEntity(dto);

		Materia materia = materiaService.crear(escuelaId, creada);

		return ResponseEntity.status(HttpStatus.CREATED).body(MateriaMapper.toResponse(materia));
	}

	@PostMapping("/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearMateriasBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<MateriaCreateDTO> materiasDTOs
	) {
		List<Materia> materias = materiasDTOs.stream()
				.map(MateriaMapper::toEntity)
				.toList();

		materiaService.crearBatch(escuelaId, materias);
	}

	@GetMapping
	public PageResponse<MateriaResponseDTO> listarMaterias(
			@PathVariable Long escuelaId,
			Pageable pageable
	) {

		int MAX_SIZE = 20;
		int pageSize = Math.min(pageable.getPageSize(), MAX_SIZE);

		Pageable limitedPageable = PageRequest.of(
				pageable.getPageNumber(),
				pageSize,
				pageable.getSort()
		);

		Page<Materia> materias =
				materiaService.buscarPorEscuela(
						escuelaId,
						limitedPageable
				);

		return PageMapper.toPageResponse(
				materias,
				MateriaMapper::toResponse
		);
	}


	@GetMapping("/nombres")
	public List<MateriaNombreDTO> listarNombresMaterias(
			@PathVariable Long escuelaId
	) {
		return materiaService.buscarNombresPorEscuela(escuelaId)
				.stream()
				.map(MateriaMapper::toNombreDTO)
				.toList();
	}

}
