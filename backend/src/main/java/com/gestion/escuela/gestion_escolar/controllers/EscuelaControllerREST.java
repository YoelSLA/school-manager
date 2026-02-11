package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.AsistenciaDiaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.EscuelaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.escuelas.EscuelaResumenDTO;
import com.gestion.escuela.gestion_escolar.mappers.AsistenciaMapper;
import com.gestion.escuela.gestion_escolar.mappers.EscuelaMapper;
import com.gestion.escuela.gestion_escolar.models.Asistencia;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.services.AsistenciaService;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/escuelas")
@RequiredArgsConstructor
@Tag(
		name = "Escuelas",
		description = "Gestión de escuelas del sistema"
)
public class EscuelaControllerREST {

	private final EscuelaService escuelaService;
	private final EmpleadoEducativoService empleadoEducativoService;
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

	@GetMapping("/{escuelaId}/empleados/{empleadoId}/asistencias")
	public List<AsistenciaDiaDTO> obtenerAsistenciasDelMes(
			@PathVariable Long escuelaId,
			@PathVariable Long empleadoId,
			@RequestParam int anio,
			@RequestParam int mes
	) {
		YearMonth yearMonth = YearMonth.of(anio, mes);

		// 1️⃣ Ausencias del mes (scopiadas por escuela)
		List<Asistencia> ausencias =
				asistenciaService.obtenerAsistenciasDelMes(
						escuelaId,
						empleadoId,
						yearMonth
				);

		Map<LocalDate, Asistencia> ausenciasPorFecha =
				ausencias.stream()
						.collect(Collectors.toMap(
								Asistencia::getFecha,
								a -> a
						));

		// 2️⃣ Días laborables (también por escuela)
		Set<LocalDate> diasLaborables =
				empleadoEducativoService.diasLaborablesEnPeriodo(
						escuelaId,
						empleadoId,
						new Periodo(
								yearMonth.atDay(1),
								yearMonth.atEndOfMonth()
						)
				);

		// 3️⃣ Mapear a DTO
		return diasLaborables.stream()
				.sorted()
				.map(dia ->
						AsistenciaMapper.toDiaDTO(
								dia,
								ausenciasPorFecha.get(dia)
						)
				)
				.toList();
	}


}


