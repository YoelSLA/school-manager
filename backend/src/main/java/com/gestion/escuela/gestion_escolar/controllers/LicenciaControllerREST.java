package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionAfectadaPorLicenciaDTO;
import com.gestion.escuela.gestion_escolar.mappers.AsignacionMapper;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.services.LicenciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/licencias")
@RequiredArgsConstructor
public class LicenciaControllerREST {

	private final LicenciaService licenciaService;

	@GetMapping("/{licenciaId}/asignaciones-afectadas")
	public List<AsignacionAfectadaPorLicenciaDTO> asignacionesAfectadas(
			@PathVariable Long licenciaId
	) {
		Licencia l = licenciaService.obtenerPorId(licenciaId);

		return licenciaService.obtenerAsignacionesAfectadas(licenciaId)
				.stream()
				.map(a -> AsignacionMapper.toAfectadaPorLicencia(a, l)).toList();
	}

}

