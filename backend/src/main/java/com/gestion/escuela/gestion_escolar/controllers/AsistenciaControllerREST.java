package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.request.EliminarInasistenciasManualDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.request.RegistrarInasistenciasManualDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.response.AsistenciaDiaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.response.AsistenciaEmpleadoResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.AsistenciaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.records.EmpleadoAsistenciaResumen;
import com.gestion.escuela.gestion_escolar.models.records.RolCount;
import com.gestion.escuela.gestion_escolar.services.asistencia.AsistenciaService;
import com.gestion.escuela.gestion_escolar.services.empleadoEducativo.EmpleadoEducativoService;
import com.gestion.escuela.gestion_escolar.services.licenciaEstatutaria.LicenciaEstatutariaService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/asistencias")
@RequiredArgsConstructor
public class AsistenciaControllerREST {

  private final AsistenciaService asistenciaService;
  private final EmpleadoEducativoService empleadoEducativoService;
  private final LicenciaEstatutariaService licenciaEstaturariaService;

  @PostMapping
  public ResponseEntity<Void> registrarInasistencias(
      @PathVariable Long escuelaId, @Valid @RequestBody RegistrarInasistenciasManualDTO request) {

    System.out.println("========================================");
    System.out.println("Registrar inasistencias");
    System.out.println("Escuela ID: " + escuelaId);
    System.out.println("Request: " + request);
    System.out.println("Empleado ID: " + request.empleadoId());
    System.out.println("Licencia ID: " + request.licenciaEstatutariaId());
    System.out.println("Fechas: " + request.fechas());
    System.out.println("Observación: " + request.observacion());

    EmpleadoEducativo empleado = empleadoEducativoService.obtenerPorId(request.empleadoId());

    System.out.println("Empleado obtenido: " + empleado);

    LicenciaEstatutaria licenciaEstatutaria =
        licenciaEstaturariaService.obtenerPorId(request.licenciaEstatutariaId());

    System.out.println("Licencia obtenida: " + licenciaEstatutaria);

    asistenciaService.registrarInasistencias(
        escuelaId, empleado, request.fechas(), licenciaEstatutaria, request.observacion());

    System.out.println("Inasistencias registradas correctamente.");
    System.out.println("========================================");

    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @GetMapping("/roles")
  public List<RolCount> obtenerRolesVigentes(
      @PathVariable Long escuelaId,
      @RequestParam("fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha) {

    return asistenciaService.contarEmpleadosPorRolVigente(escuelaId, fecha).stream()
        .map(r -> new RolCount(r.rol(), r.rol().getLabel(), r.cantidad()))
        .toList();
  }

  @GetMapping("/empleados")
  public PageResponse<AsistenciaEmpleadoResumenDTO> buscarEmpleados(
      @PathVariable Long escuelaId,
      @RequestParam LocalDate fecha,
      @RequestParam(required = false) List<RolEducativo> roles,
      @RequestParam(required = false) String q,
      Pageable pageable) {

    int maxSize = 20;

    Pageable limitedPageable =
        PageRequest.of(
            pageable.getPageNumber(),
            Math.min(pageable.getPageSize(), maxSize),
            pageable.getSort());

    Page<EmpleadoEducativo> empleados =
        asistenciaService.buscarEmpleados(escuelaId, fecha, roles, q, limitedPageable);

    return PageMapper.toPageResponse(
        empleados,
        empleado -> {
          EmpleadoAsistenciaResumen resumen =
              asistenciaService.getResumenAsistenciaEmpleado(empleado.getId(), fecha);
          return AsistenciaMapper.toResumenDTO(empleado, resumen);
        });
  }

  @DeleteMapping
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void eliminarInasistencias(
      @PathVariable Long escuelaId, @Valid @RequestBody EliminarInasistenciasManualDTO dto) {

    asistenciaService.eliminarInasistencias(escuelaId, dto.empleadoId(), dto.fechas());
  }

  @GetMapping("/empleados/{empleadoId}")
  public List<AsistenciaDiaDTO> obtenerAsistenciasDelMes(
      @PathVariable Long escuelaId,
      @PathVariable Long empleadoId,
      @RequestParam int anio,
      @RequestParam int mes) {

    YearMonth yearMonth = YearMonth.of(anio, mes);

    return asistenciaService
        .obtenerEstadoAsistenciaMensual(escuelaId, empleadoId, yearMonth)
        .stream()
        .map(AsistenciaMapper::toDiaDTO)
        .toList();
  }
}
