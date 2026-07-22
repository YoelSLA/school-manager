package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.request.AsignacionProvisionalCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.request.AsignacionTitularCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.request.AsignacionUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionAdministrativaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionCursoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionDetalleDTO.DesignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.mappers.AsignacionMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.DesignacionMapper;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.domainServices.ServicioEstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.services.designacion.DesignacionCommandService;
import com.gestion.escuela.gestion_escolar.services.designacion.DesignacionQueryService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/designaciones")
@RequiredArgsConstructor
public class DesignacionControllerREST {

  private final DesignacionCommandService designacionCommandService;
  private final DesignacionQueryService designacionQueryService;
  private final ServicioEstadoDesignacion servicioEstadoDesignacion;

  @PostMapping("/{designacionId}/cubrir/titular")
  @ResponseStatus(HttpStatus.CREATED)
  public AsignacionDetalleDTO cubrirConTitular(
      @PathVariable Long designacionId, @Valid @RequestBody AsignacionTitularCreateDTO dto) {
    Asignacion asignacion =
        designacionCommandService.cubrirConTitular(
            designacionId, dto.empleadoId(), dto.fechaTomaPosesion(), dto.secuencia());

    return AsignacionMapper.toDetalle(asignacion, asignacion.getEstadoEn(LocalDate.now()));
  }

  @PostMapping("/{designacionId}/cubrir/provisional")
  @ResponseStatus(HttpStatus.CREATED)
  public AsignacionDetalleDTO cubrirConProvisional(
      @PathVariable Long designacionId, @Valid @RequestBody AsignacionProvisionalCreateDTO dto) {
    Asignacion asignacion =
        designacionCommandService.cubrirConProvisional(
            designacionId,
            dto.empleadoId(),
            dto.fechaTomaPosesion(),
            dto.fechaCese(),
            dto.secuencia());

    return AsignacionMapper.toDetalle(asignacion, asignacion.getEstadoEn(LocalDate.now()));
  }

  @GetMapping("/{designacionId}")
  @ResponseStatus(HttpStatus.OK)
  public DesignacionDetalleDTO obtenerDetalle(@PathVariable Long designacionId) {
    Designacion designacion = designacionQueryService.obtenerPorId(designacionId);
    EstadoDesignacion estado = servicioEstadoDesignacion.getEstadoEn(designacion, LocalDate.now());
    return DesignacionMapper.toDetalle(designacion, estado);
  }

  @GetMapping("/{designacionId}/cargo-activo")
  public ResponseEntity<AsignacionDetalleDTO> obtenerCargoActivo(@PathVariable Long designacionId) {

    var cargoActivo = designacionQueryService.obtenerCargoActivo(designacionId, LocalDate.now());

    return cargoActivo
        .map(a -> AsignacionMapper.toDetalle(a, a.getEstadoEn(LocalDate.now())))
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.noContent().build());
  }

  @GetMapping("/{designacionId}/cargos")
  @ResponseStatus(HttpStatus.OK)
  public List<AsignacionDetalleDTO> obtenerOtrosCargos(
      @PathVariable Long designacionId,
      @RequestParam(required = false) EstadoAsignacion estado,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
          LocalDate fecha) {
    LocalDate referencia = fecha != null ? fecha : LocalDate.now();

    return designacionQueryService.obtenerOtrosCargos(designacionId, estado, referencia).stream()
        .map(a -> AsignacionMapper.toDetalle(a, a.getEstadoEn(LocalDate.now())))
        .toList();
  }

  @PutMapping("/{designacionId}/curso")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void actualizarDesignacionCurso(
      @PathVariable Long designacionId, @Valid @RequestBody DesignacionCursoDTO dto) {

    Set<FranjaHoraria> franjas =
        dto.franjasHorarias().stream()
            .map(f -> new FranjaHoraria(f.dia(), f.horaDesde(), f.horaHasta()))
            .collect(Collectors.toSet());

    designacionCommandService.actualizarDesignacionCurso(
        designacionId, dto.cupof(), dto.materiaId(), dto.cursoId(), dto.orientacion(), franjas);
  }

  @PutMapping("/{designacionId}/administrativa")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void actualizarDesignacionAdministrativa(
      @PathVariable Long designacionId, @Valid @RequestBody DesignacionAdministrativaDTO dto) {

    Set<FranjaHoraria> franjas =
        dto.franjasHorarias().stream()
            .map(f -> new FranjaHoraria(f.dia(), f.horaDesde(), f.horaHasta()))
            .collect(Collectors.toSet());

    designacionCommandService.actualizarDesignacionAdministrativa(
        designacionId, dto.cupof(), dto.rolEducativo(), franjas);
  }

  @PutMapping("/{designacionId}/asignaciones/{asignacionId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public AsignacionDetalleDTO actualizarAsignacion(
      @PathVariable Long designacionId,
      @PathVariable Long asignacionId,
      @Valid @RequestBody AsignacionUpdateDTO dto) {
    Asignacion asignacion =
        designacionCommandService.actualizarAsignacion(
            designacionId,
            asignacionId,
            dto.empleadoId(),
            dto.fechaTomaPosesion(),
            dto.fechaCese(),
            dto.secuencia());

    return AsignacionMapper.toDetalle(asignacion, asignacion.getEstadoEn(LocalDate.now()));
  }

  @DeleteMapping("/{designacionId}/asignaciones/{asignacionId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void eliminarAsignacion(
      @PathVariable Long designacionId, @PathVariable Long asignacionId) {
    designacionCommandService.eliminarAsignacion(designacionId, asignacionId);
  }
}
