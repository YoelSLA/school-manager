package com.gestion.escuela.gestion_escolar.controllers.escuelasContexto;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResumenDTO;
import com.gestion.escuela.gestion_escolar.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.services.LicenciaService;
import com.gestion.escuela.gestion_escolar.web.PaginationUtils;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/licencias")
@AllArgsConstructor
public class EscuelaLicenciaControllerREST {

	private final LicenciaService licenciaService;

	@GetMapping
	public PageResponse<LicenciaResumenDTO> listarLicencias(
			@PathVariable Long escuelaId,
			Pageable pageable
	) {

		Pageable limitedPageable = PaginationUtils.limit(pageable);

		Page<Licencia> licencias = licenciaService.buscarPorEscuela(escuelaId, limitedPageable);

		return PageMapper.toPageResponse(licencias, LicenciaMapper::toResumen);
	}

}


