package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.request.EscuelaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.response.EscuelaResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.mappers.EscuelaMapper;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.services.AsistenciaService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/escuelas")
@RequiredArgsConstructor
@Tag(
		name = "Escuelas",
		description = "Gestión de escuelas del sistema"
)
public class EscuelaControllerREST {

	private final EscuelaService escuelaService;
	private final AsistenciaService asistenciaService;

	@PostMapping
	public ResponseEntity<EscuelaResumenDTO> crear(@Valid @RequestBody EscuelaCreateDTO dto) {
		Escuela escuelaCreada = escuelaService.crear(EscuelaMapper.toEntity(dto));
		return ResponseEntity.status(HttpStatus.CREATED).body(EscuelaMapper.toResponse(escuelaCreada));
	}

	@GetMapping
	public List<EscuelaResumenDTO> listar() {
		return escuelaService.listarTodas()
				.stream()
				.map(EscuelaMapper::toResponse)
				.toList();
	}

	@GetMapping("/{escuelaId}")
	public EscuelaResumenDTO obtenerDetalle(@PathVariable Long escuelaId) {
		return EscuelaMapper.toResponse(escuelaService.obtenerPorId(escuelaId));
	}

}


