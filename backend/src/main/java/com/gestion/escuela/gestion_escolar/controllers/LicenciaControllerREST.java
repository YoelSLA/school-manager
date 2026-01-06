package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
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
	private final DesignacionService designacionService;

	@GetMapping
	public List<LicenciaResponseDTO> listarTodas() {
		return licenciaService.listarTodas();
	}

	@GetMapping("/designacion/{designacionId}")
	public List<LicenciaResponseDTO> listarPorDesignacion(@PathVariable Long designacionId) {

		Designacion designacion = designacionService.obtenerPorId(designacionId);
		return licenciaService.listarPorDesignacion(designacion);
	}

}

