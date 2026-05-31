package com.gestion.escuela.gestion_escolar.controllers.escuela;

import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.request.MateriaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.request.MateriaUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.response.MateriaNombreDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.materia.response.MateriaResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.MateriaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
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
		Materia materia = materiaService.crear(escuelaId, MateriaMapper.toEntity(dto));
		return MateriaMapper.toResponse(materia);
	}

	@PostMapping("/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<MateriaCreateDTO> materiasDTOs
	) {
		List<Materia> materias = materiasDTOs.stream()
				.map(MateriaMapper::toEntity)
				.toList();

		materiaService.crearBatch(escuelaId, materias);
	}

	@PutMapping("/{materiaId}")
	public MateriaResponseDTO actualizar(
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
	public void eliminar(
			@PathVariable Long escuelaId,
			@PathVariable Long materiaId
	) {
		materiaService.eliminar(escuelaId, materiaId);
	}

	@GetMapping
	public PageResponse<MateriaResponseDTO> listar(
			@PathVariable Long escuelaId,
			Pageable pageable
	) {
		Pageable limitedPageable = PaginationUtils.limit(pageable);
		Page<Materia> materias = materiaService.listarMateriasPorEscuela(escuelaId, limitedPageable);

		return PageMapper.toPageResponse(materias, MateriaMapper::toResponse);
	}

	@GetMapping("/nombres")
	public List<MateriaNombreDTO> listarNombres(
			@PathVariable Long escuelaId
	) {
		var materias = materiaService.listarMateriasPorEscuela(escuelaId);

		return materias
				.stream()
				.map(MateriaMapper::toNombreDTO)
				.toList();
	}

}
