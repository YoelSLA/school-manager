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
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/escuelas/{escuelaId}/licencias")
@AllArgsConstructor
public class EscuelaLicenciaControllerREST {

  private final LicenciaService licenciaService;
  private final DesignacionQueryService designacionQueryService;

  @GetMapping
  public PageResponse<LicenciaRowDTO> listar(@PathVariable Long escuelaId, Pageable pageable) {
    Pageable limitedPageable = PaginationUtils.limit(pageable);

    Page<Licencia> licencias = licenciaService.buscarPorEscuela(escuelaId, limitedPageable);

    LocalDate hoy = LocalDate.now();

    Set<Long> designacionIds =
            licencias.getContent().stream()
                    .flatMap(licencia -> licencia.getAsignaciones().stream())
                    .map(asignacion -> asignacion.getDesignacion().getId())
                    .collect(Collectors.toSet());

    Map<Long, EstadoDesignacion> estadosDesignacion =
            designacionQueryService.obtenerEstadosEn(designacionIds, hoy);

    return PageMapper.toPageResponse(
            licencias,
            licencia ->
                    LicenciaMapper.toRow(
                            licencia,
                            licenciaService.obtenerEstadoEn(licencia, estadosDesignacion, hoy),
                            hoy));
  }
}