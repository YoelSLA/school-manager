package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.CupofAdministrativoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.CupofAdministrativoResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.FranjaHorariaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofAdministrativo;

import java.util.List;

public class CupofAdministrativoMapper {

  public static CupofAdministrativo toEntity(CupofAdministrativoCreateDTO dto, Escuela escuela, EmpleadoEducativo empleadoEducativo) {
    CupofAdministrativo cupof = new CupofAdministrativo();
    cupof.setEscuela(escuela);
    cupof.setEmpleadoEducativo(empleadoEducativo);
    cupof.setNumeroCupof(dto.getNumeroCupof());
    cupof.setSituacionDeRevista(dto.getSituacionDeRevista());
    cupof.setRolEducativo(dto.getRolEducativo());
    List<FranjaHoraria> franjas = dto.getHorarios().stream()
            .map(h -> FranjaHorariaMapper.toEntity(h, cupof))
            .toList();
    cupof.getFranjasHorarias().addAll(franjas);
    return cupof;
  }

  public static CupofAdministrativoResponseDTO toResponse(CupofAdministrativo cupof) {

    List<FranjaHorariaResponseDTO> franjasHorarias =
            cupof.getFranjasHorarias().stream()
                    .map(FranjaHorariaMapper::toResponse)
                    .toList();

    CupofAdministrativoResponseDTO dto = new CupofAdministrativoResponseDTO();
    dto.setNumeroCupof(cupof.getNumeroCupof());
    dto.setNombreEscuela(cupof.getEscuela().getNombre());
    dto.setEmpleado(EmpleadoEducativoBasicoMapper.toResponse(cupof.getEmpleadoEducativo()));
    dto.setRolEducativo(cupof.getRolEducativo());
    dto.setSituacionDeRevista(cupof.getSituacionDeRevista());
    dto.setFranjasHorarias(franjasHorarias);

    return dto;
  }
}
