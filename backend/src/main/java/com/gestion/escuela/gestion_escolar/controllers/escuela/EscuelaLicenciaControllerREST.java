package com.gestion.escuela.gestion_escolar.controllers.escuela;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
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
	public PageResponse<LicenciaResumenDTO> listar(
			@PathVariable Long escuelaId,
			Pageable pageable
	) {
		Pageable limitedPageable = PaginationUtils.limit(pageable);

		long inicioQuery = System.currentTimeMillis();

		Page<Licencia> licencias = licenciaService.buscarPorEscuela(
				escuelaId,
				limitedPageable
		);

		System.out.println(
				"SERVICE+QUERY -> "
						+ (System.currentTimeMillis() - inicioQuery)
						+ " ms"
		);

		long inicioMapper = System.currentTimeMillis();

		PageResponse<LicenciaResumenDTO> response =
				PageMapper.toPageResponse(
						licencias,
						LicenciaMapper::toResumen
				);

		System.out.println(
				"MAPPER -> "
						+ (System.currentTimeMillis() - inicioMapper)
						+ " ms"
		);

		return response;
	}
}
