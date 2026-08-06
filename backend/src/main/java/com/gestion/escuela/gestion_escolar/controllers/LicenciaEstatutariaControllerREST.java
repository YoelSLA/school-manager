package com.gestion.escuela.gestion_escolar.controllers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.request.LicenciaEstatutariaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.request.LicenciaEstatutariaUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.response.LicenciaEstatutariaResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.response.LicenciaEstatutariaRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.response.LicenciaEstatutariaSelectDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.PageResponse;
import com.gestion.escuela.gestion_escolar.controllers.mappers.LicenciaEstatutariaMapper;
import com.gestion.escuela.gestion_escolar.controllers.mappers.PageMapper;
import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import com.gestion.escuela.gestion_escolar.services.licenciaEstatutaria.LicenciaEstatutariaService;
import com.gestion.escuela.gestion_escolar.web.PaginationUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/licencias-estatutarias")
@RequiredArgsConstructor
public class LicenciaEstatutariaControllerREST {

  private final LicenciaEstatutariaService licenciaEstatutariaService;

  @PostMapping
  public LicenciaEstatutariaResponseDTO crear(
      @Valid @RequestBody LicenciaEstatutariaCreateDTO dto) {

    return LicenciaEstatutariaMapper.toResponseDTO(
        licenciaEstatutariaService.crear(
            dto.articulo(), dto.codigo(), dto.nombre(), dto.descripcion()));
  }

  @PutMapping("/{id}")
  public LicenciaEstatutariaResponseDTO actualizar(
      @PathVariable Long id, @Valid @RequestBody LicenciaEstatutariaUpdateDTO dto) {

    return LicenciaEstatutariaMapper.toResponseDTO(
        licenciaEstatutariaService.actualizar(
            id,
            dto.articulo(),
            dto.codigo(),
            dto.nombre(),
            dto.descripcion(),
            false)); // TODO: ARREGLAR
  }

  @GetMapping("/{id}")
  public LicenciaEstatutariaResponseDTO obtenerPorId(@PathVariable Long id) {
    return LicenciaEstatutariaMapper.toResponseDTO(licenciaEstatutariaService.obtenerPorId(id));
  }

  @GetMapping
  public PageResponse<LicenciaEstatutariaRowDTO> listar(Pageable pageable) {
    Pageable limitedPageable = PaginationUtils.limit(pageable);

    Page<LicenciaEstatutaria> licencias = licenciaEstatutariaService.obtenerTodas(limitedPageable);

    return PageMapper.toPageResponse(licencias, LicenciaEstatutariaMapper::toRow);
  }

  @DeleteMapping("/{id}")
  public void eliminar(@PathVariable Long id) {
    licenciaEstatutariaService.eliminar(id);
  }

  @GetMapping("/select")
  public List<LicenciaEstatutariaSelectDTO> listarParaSelect() {
    return licenciaEstatutariaService.obtenerActivas().stream()
            .map(LicenciaEstatutariaMapper::toSelectDTO)
            .toList();
  }
}
