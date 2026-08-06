package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.request.CambiarCoberturaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.request.CubrirDesignacionesDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.request.LicenciaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.request.RenovarLicenciaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaDesignacionDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaTimelineItemDTO;
import com.gestion.escuela.gestion_escolar.controllers.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PeriodoMapper;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.services.designacion.DesignacionCommandService;
import com.gestion.escuela.gestion_escolar.services.designacion.DesignacionQueryService;
import com.gestion.escuela.gestion_escolar.services.licencia.LicenciaService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/licencias")
@RequiredArgsConstructor
public class LicenciaControllerREST {

  private final LicenciaService licenciaService;
  private final DesignacionCommandService designacionCommandService;
  private final DesignacionQueryService designacionQueryService;

  @PostMapping("/empleados/{empleadoId}")
  @ResponseStatus(HttpStatus.CREATED)
  public LicenciaDetalleDTO crearLicencia(
      @PathVariable Long empleadoId, @Valid @RequestBody LicenciaCreateDTO dto) {

    Licencia licencia =
        licenciaService.crear(
            empleadoId,
            dto.licenciaEstatutariaId(),
            PeriodoMapper.toEntity(dto.periodo()),
            dto.descripcion(),
            dto.asignacionesIds());

    return LicenciaMapper.toDetalle(licencia, EstadoLicencia.CUBIERTA);
  }

  @PostMapping("/{licenciaId}/coberturas")
  @ResponseStatus(HttpStatus.CREATED)
  public void cubrirDesignaciones(
      @PathVariable Long licenciaId, @RequestBody @Valid CubrirDesignacionesDTO dto) {
    designacionCommandService.cubrirConSuplentes(
        licenciaId,
        dto.empleadoId(),
        dto.designacionesIds(),
        dto.fechaTomaPosesion(),
        dto.secuencia());
  }

  @PutMapping("/{licenciaId}/coberturas/{designacionId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void cambiarCobertura(
      @PathVariable Long licenciaId,
      @PathVariable Long designacionId,
      @RequestBody @Valid CambiarCoberturaDTO dto) {

    designacionCommandService.cambiarCobertura(
        licenciaId, designacionId, dto.empleadoId(), dto.fechaTomaPosesion(), dto.secuencia());
  }

  @DeleteMapping("/{licenciaId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void eliminarLicencia(@PathVariable Long licenciaId) {
    licenciaService.eliminarLicencia(licenciaId);
  }

  @PostMapping("/{licenciaId}/renovaciones")
  public ResponseEntity<LicenciaDetalleDTO> renovarLicencia(
      @PathVariable Long licenciaId, @Valid @RequestBody RenovarLicenciaDTO dto) {
    Licencia renovada =
        licenciaService.renovarLicencia(
            licenciaId, dto.licenciaEstatutariaId(), dto.nuevoHasta(), dto.descripcion());

    return ResponseEntity.status(HttpStatus.CREATED)
        .body(LicenciaMapper.toDetalle(renovada, EstadoLicencia.CUBIERTA));
  }

  @GetMapping("/{licenciaId}")
  public LicenciaDetalleDTO obtenerDetalle(@PathVariable Long licenciaId) {

    Licencia licencia = licenciaService.obtenerPorId(licenciaId);

    Map<Long, EstadoDesignacion> estados =
        licenciaService.obtenerDesignacionesAfectadas(licenciaId).stream()
            .collect(
                Collectors.toMap(
                    Designacion::getId,
                    designacion ->
                        designacionQueryService
                                .obtenerCargoActivo(
                                    designacion.getId(), licencia.getPeriodo().getFechaDesde())
                                .isPresent()
                            ? EstadoDesignacion.CUBIERTA
                            : EstadoDesignacion.VACANTE));

    EstadoLicencia estado =
        licenciaService.obtenerEstadoEn(licencia, estados, licencia.getPeriodo().getFechaDesde());

    return LicenciaMapper.toDetalle(licencia, estado);
  }

  @GetMapping("/{licenciaId}/designaciones-afectadas")
  public List<LicenciaDesignacionDTO> obtenerDesignacionesAfectadas(@PathVariable Long licenciaId) {

    Licencia licencia = licenciaService.obtenerPorId(licenciaId);

    return licenciaService.obtenerDesignacionesAfectadas(licenciaId).stream()
        .map(
            d -> {
              Asignacion asignacionQueEjerce =
                  designacionQueryService
                      .obtenerCargoActivo(d.getId(), licencia.getPeriodo().getFechaDesde())
                      .orElse(null);

              return LicenciaMapper.toDesignacionDTO(d, asignacionQueEjerce);
            })
        .toList();
  }

  @GetMapping("/{licenciaId}/timeline")
  public List<LicenciaTimelineItemDTO> obtenerTimeline(@PathVariable Long licenciaId) {

    return licenciaService.obtenerTimeline(licenciaId).stream()
        .map(LicenciaMapper::toTimelineItem)
        .toList();
  }
}
