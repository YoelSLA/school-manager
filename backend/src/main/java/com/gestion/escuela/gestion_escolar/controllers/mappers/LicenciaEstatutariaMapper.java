package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.request.LicenciaEstatutariaCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.response.LicenciaEstatutariaResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.response.LicenciaEstatutariaRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.response.LicenciaEstatutariaSelectDTO;
import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;

public final class LicenciaEstatutariaMapper {

  private LicenciaEstatutariaMapper() {}

  public static LicenciaEstatutariaResponseDTO toResponseDTO(
      LicenciaEstatutaria licenciaEstatutaria) {

    if (licenciaEstatutaria == null) {
      return null;
    }

    return new LicenciaEstatutariaResponseDTO(
        licenciaEstatutaria.getId(),
        licenciaEstatutaria.getArticulo(),
        licenciaEstatutaria.getCodigo(),
        licenciaEstatutaria.getNombre(),
        licenciaEstatutaria.getDescripcion(),
        licenciaEstatutaria.isActiva());
  }

  public static LicenciaEstatutaria toModel(LicenciaEstatutariaCreateDTO dto) {

    if (dto == null) {
      return null;
    }

    return LicenciaEstatutaria.builder()
        .articulo(dto.articulo())
        .codigo(dto.codigo())
        .nombre(dto.nombre())
        .descripcion(dto.descripcion())
        .build();
  }

  public static LicenciaEstatutariaRowDTO toRow(LicenciaEstatutaria l) {
    return new LicenciaEstatutariaRowDTO(
        l.getId(), l.getArticulo(), l.getCodigo(), l.getNombre(), l.getDescripcion(), l.isActiva());
  }

  public static LicenciaEstatutariaSelectDTO toSelectDTO(LicenciaEstatutaria licencia) {
    return new LicenciaEstatutariaSelectDTO(
        licencia.getId(), licencia.getArticulo(), licencia.getCodigo(), licencia.getDescripcion());
  }
}
