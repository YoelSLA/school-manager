package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.FranjaHorariaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.FranjaHorariaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.cupof.Cupof;

public final class FranjaHorariaMapper {

  public static FranjaHoraria toEntity(FranjaHorariaDTO dto, Cupof cupof) {
    FranjaHoraria entity = new FranjaHoraria();
    entity.setDia(dto.getDia());
    entity.setHoraDesde(dto.getDesde());
    entity.setHoraHasta(dto.getHasta());
    entity.setCupof(cupof);
    return entity;
  }

  public static FranjaHorariaResponseDTO toResponse(FranjaHoraria entity) {
    FranjaHorariaResponseDTO dto = new FranjaHorariaResponseDTO();
    dto.setDia(entity.getDia());
    dto.setDesde(entity.getHoraDesde());
    dto.setHasta(entity.getHoraHasta());
    return dto;
  }
}