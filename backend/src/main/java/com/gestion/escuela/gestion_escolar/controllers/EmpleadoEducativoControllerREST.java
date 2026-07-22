package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionEmpleadoEducativoRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO.AsignacionLicenciaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoAsignacionesDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoLicenciasDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaEmpleadoEducativoRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.request.BajaDefinitivaDTO;
import com.gestion.escuela.gestion_escolar.controllers.mappers.AsignacionMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.EmpleadoEducativoMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.services.asignacion.AsignacionService;
import com.gestion.escuela.gestion_escolar.services.designacion.DesignacionQueryService;
import com.gestion.escuela.gestion_escolar.services.empleadoEducativo.EmpleadoEducativoService;
import com.gestion.escuela.gestion_escolar.services.licencia.LicenciaService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/empleadosEducativos")
@RequiredArgsConstructor
public class EmpleadoEducativoControllerREST {

  private final EmpleadoEducativoService empleadoEducativoService;
  private final DesignacionQueryService designacionQueryService;
  private final AsignacionService asignacionService;
  private final LicenciaService licenciaService;

  @PostMapping("/{empleadoId}/baja-definitiva")
  public ResponseEntity<Void> darDeBajaDefinitiva(
      @PathVariable Long empleadoId, @Valid @RequestBody BajaDefinitivaDTO dto) {
    empleadoEducativoService.darDeBajaDefinitiva(empleadoId, LocalDate.now(), dto.causa());

    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

  @GetMapping("/{empleadoId}")
  public EmpleadoEducativoDetalleDTO obtenerPorId(@PathVariable Long empleadoId) {
    EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(empleadoId);
    Set<RolEducativo> rolesEducativos = empleadoEducativoService.obtenerRolesEducativos(empleadoId);
    return EmpleadoEducativoMapper.toDetalle(empleado, rolesEducativos);
  }

  @GetMapping("/{empleadoId}/asignaciones-activas")
  public Set<AsignacionLicenciaDTO> obtenerAsignacionesActivas(@PathVariable Long empleadoId) {

    return empleadoEducativoService.obtenerAsignacionesActivas(empleadoId).stream()
        .map(AsignacionMapper::toLicenciaItem)
        .collect(Collectors.toSet());
  }

  @GetMapping("/{empleadoId}/asignaciones")
  public EmpleadoEducativoAsignacionesDTO obtenerAsignaciones(@PathVariable Long empleadoId) {
    LocalDate fecha = LocalDate.now();

    EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(empleadoId);

    Map<Long, EstadoDesignacion> estadosDesignacion =
        empleado.getAsignaciones().stream()
            .collect(
                Collectors.toMap(
                    a -> a.getDesignacion().getId(),
                    a ->
                        designacionQueryService.obtenerEstadoEn(
                            a.getDesignacion().getId(), fecha)));

    List<AsignacionEmpleadoEducativoRowDTO> items =
        empleado.getAsignaciones().stream()
            .map(
                a ->
                    AsignacionMapper.toAsignacionRow(
                        a,
                        a.getEstadoEn(fecha),
                        estadosDesignacion.get(a.getDesignacion().getId())))
            .toList();

    int total = items.size();
    int activas = (int) asignacionService.contarActivas(empleadoId, fecha);
    int finalizadas = total - activas;

    return EmpleadoEducativoMapper.toAsignaciones(empleado, items, total, activas, finalizadas);
  }

  @GetMapping("/{empleadoId}/licencias")
  public EmpleadoEducativoLicenciasDTO obtenerLicencias(@PathVariable Long empleadoId) {
    LocalDate fecha = LocalDate.now();

    EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(empleadoId);

    Set<Long> designacionIds =
        empleado.getLicencias().stream()
            .flatMap(l -> l.getAsignaciones().stream())
            .map(a -> a.getDesignacion().getId())
            .collect(Collectors.toSet());

    Map<Long, EstadoDesignacion> estadosDesignacion =
        designacionQueryService.obtenerEstadosEn(designacionIds, fecha);

    LicenciaDetalleDTO licenciaActiva =
        licenciaService
            .obtenerLicenciaActiva(empleadoId, fecha)
            .map(
                l ->
                    LicenciaMapper.toDetalle(
                        l, licenciaService.obtenerEstadoEn(l, estadosDesignacion, fecha)))
            .orElse(null);

    List<LicenciaEmpleadoEducativoRowDTO> historial =
        empleado.getLicencias().stream()
            .filter(l -> !l.estaVigenteEn(fecha))
            .map(
                l ->
                    LicenciaMapper.toLicenciaRow(
                        l, licenciaService.obtenerEstadoEn(l, estadosDesignacion, fecha)))
            .toList();

    return EmpleadoEducativoMapper.toLicencias(empleado, licenciaActiva, historial);
  }
}
