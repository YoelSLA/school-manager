package com.gestion.escuela.gestion_escolar.controllers.escuela;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.services.designacion.DesignacionQueryService;
import com.gestion.escuela.gestion_escolar.services.licencia.LicenciaService;
import com.gestion.escuela.gestion_escolar.web.PaginationUtils;
import java.time.LocalDate;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
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
  private final DesignacionQueryService designacionQueryService;

  @GetMapping
  public PageResponse<LicenciaRowDTO> listar(@PathVariable Long escuelaId, Pageable pageable) {

    long totalInicio = System.currentTimeMillis();

    Pageable limitedPageable = PaginationUtils.limit(pageable);

    long t1 = System.currentTimeMillis();
    Page<Licencia> licencias = licenciaService.buscarPorEscuela(escuelaId, limitedPageable);
    System.out.println("1. Buscar licencias: " + (System.currentTimeMillis() - t1) + " ms");

    LocalDate hoy = LocalDate.now();

    t1 = System.currentTimeMillis();
    Set<Long> designacionIds =
        licencias.getContent().stream()
            .flatMap(licencia -> licencia.getAsignaciones().stream())
            .map(asignacion -> asignacion.getDesignacion().getId())
            .collect(Collectors.toSet());
    System.out.println("2. Obtener IDs: " + (System.currentTimeMillis() - t1) + " ms");

    t1 = System.currentTimeMillis();
    Map<Long, EstadoDesignacion> estadosDesignacion =
        designacionQueryService.obtenerEstadosEn(designacionIds, hoy);
    System.out.println("3. Obtener estados: " + (System.currentTimeMillis() - t1) + " ms");

    t1 = System.currentTimeMillis();
    PageResponse<LicenciaRowDTO> response =
        PageMapper.toPageResponse(
            licencias,
            licencia ->
                LicenciaMapper.toRow(
                    licencia,
                    licenciaService.obtenerEstadoEn(licencia, estadosDesignacion, hoy),
                    hoy));
    System.out.println("4. Mapear DTOs: " + (System.currentTimeMillis() - t1) + " ms");

    System.out.println("TOTAL: " + (System.currentTimeMillis() - totalInicio) + " ms");

    return response;
  }
}
