package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.administrativas.DesignacionAdministrativaResumenDTO;
import com.gestion.escuela.gestion_escolar.mappers.DesignacionAdministrativaMapper;
import com.gestion.escuela.gestion_escolar.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
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
@RequestMapping("/api/escuelas/{escuelaId}/designaciones/administrativas")
@AllArgsConstructor
public class EscuelaDesignacionAdministrativaControllerREST {

	private final EscuelaService escuelaService;
	private final DesignacionService designacionService;

	@PostMapping
	public ResponseEntity<DesignacionAdministrativaResumenDTO> crearAdministrativa(
			@PathVariable Long escuelaId,
			@Valid @RequestBody DesignacionAdministrativaCreateDTO dto
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		DesignacionAdministrativa designacion = DesignacionAdministrativaMapper.toEntity(dto, escuela);

		DesignacionAdministrativa creada = designacionService.crear(designacion);

		return ResponseEntity.status(HttpStatus.CREATED).body(DesignacionAdministrativaMapper.toResumen(creada));
	}

	@PostMapping("/batch")
	@ResponseStatus(HttpStatus.CREATED)
	public void crearAdministrativasBatch(
			@PathVariable Long escuelaId,
			@RequestBody List<DesignacionAdministrativaCreateDTO> administrativasDTOs
	) {
		Escuela escuela = escuelaService.obtenerPorId(escuelaId);

		List<DesignacionAdministrativa> administrativas = administrativasDTOs.stream().
				map(dto -> DesignacionAdministrativaMapper.toEntity(dto, escuela)).toList();

		designacionService.crearBatch(administrativas);
	}

	@GetMapping
	public PageResponse<DesignacionAdministrativaResumenDTO> listarAdministrativas(
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

		Page<DesignacionAdministrativa> designaciones =
				designacionService.obtenerDesignacionesPorEscuela(
						escuelaId,
						DesignacionAdministrativa.class,
						limitedPageable
				);

		return PageMapper.toPageResponse(
				designaciones,
				DesignacionAdministrativaMapper::toResumen
		);
	}


}
