package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materias.MateriaUpdateDTO;
import com.gestion.escuela.gestion_escolar.mappers.MateriaMapper;
import com.gestion.escuela.gestion_escolar.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.Materia;
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
@RequestMapping("/api/escuelas/{escuelaId}/materias")
@AllArgsConstructor
public class EscuelaMateriaControllerREST {

	private final MateriaService materiaService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public MateriaResponseDTO crear(
			@PathVariable Long escuelaId,
			@Valid @RequestBody MateriaCreateDTO dto
	) {

		Materia materiaModelo = MateriaMapper.toEntity(dto);

		Materia materiaCreada = materiaService.crear(escuelaId, materiaModelo);

		return MateriaMapper.toResponse(materiaCreada);
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

	@PutMapping("/{materiaId}")
	public MateriaResponseDTO actualizarMateria(
			@PathVariable Long escuelaId,
			@PathVariable Long materiaId,
			@Valid @RequestBody MateriaUpdateDTO dto
	) {

		Materia guardada = materiaService.actualizar(
				escuelaId,
				materiaId,
				dto.nombre(),
				dto.abreviatura(),
				dto.cantidadModulos());

		return MateriaMapper.toResponse(guardada);

	}

	@DeleteMapping("/{materiaId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void eliminarMateria(
			@PathVariable Long escuelaId,
			@PathVariable Long materiaId
	) {
		materiaService.eliminar(escuelaId, materiaId);
	}

	@GetMapping
	public PageResponse<MateriaResponseDTO> listarMateriasPorEscuela(
			@PathVariable Long escuelaId,
			Pageable pageable
	) {

		Pageable limitedPageable = PaginationUtils.limit(pageable);

		Page<Materia> materias = materiaService.listarMateriasPorEscuela(escuelaId, limitedPageable);

		return PageMapper.toPageResponse(materias, MateriaMapper::toResponse);
	}

	@GetMapping("/nombres")
	public List<MateriaNombreDTO> listarMateriasPorEscuela(
			@PathVariable Long escuelaId
	) {
		return materiaService.listarMateriasPorEscuela(escuelaId)
				.stream()
				.map(MateriaMapper::toNombreDTO)
				.toList();
	}

}
