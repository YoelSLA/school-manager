package com.gestion.escuela.gestion_escolar.controllers.escuela;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaResumenDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.services.licencia.LicenciaService;
import com.gestion.escuela.gestion_escolar.web.PaginationUtils;
import java.time.LocalDate;
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

  @GetMapping
  public PageResponse<LicenciaResumenDTO> listar(@PathVariable Long escuelaId, Pageable pageable) {
    Pageable limitedPageable = PaginationUtils.limit(pageable);

    Page<Licencia> licencias = licenciaService.buscarPorEscuela(escuelaId, limitedPageable);

    // TODO: Reemplazar EstadoLicencia.TODO por el cálculo del estado cuando
    // se implemente el servicio correspondiente.
    PageResponse<LicenciaResumenDTO> response =
        PageMapper.toPageResponse(
            licencias,
            licencia ->
                LicenciaMapper.toResumen(licencia, EstadoLicencia.NO_VIGENTE, LocalDate.now()));

    return response;
  }
}
