package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.EmpleadoEducativoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.EmpleadoEducativoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;

public class EmpleadoEducativoMapper {

  public static EmpleadoEducativo toEntity(EmpleadoEducativoCreateDTO dto, Escuela escuela) {
    EmpleadoEducativo entity = new EmpleadoEducativo();
    entity.setEscuela(escuela);
    entity.setCuil(dto.getCuil());
    entity.setNombre(dto.getNombre());
    entity.setApellido(dto.getApellido());
    entity.setDomicilio(dto.getDomicilio());
    entity.setEmail(dto.getEmail());
    entity.setTelefono(dto.getTelefono());
    entity.setFechaDeNacimiento(dto.getFechaDeNacimiento());
    entity.setFechaDeIngreso(dto.getFechaDeIngreso());
    return entity;

  }

  public static EmpleadoEducativoResponseDTO toResponse(EmpleadoEducativo entity) {
    EmpleadoEducativoResponseDTO dto = new EmpleadoEducativoResponseDTO();
    dto.setNombreEscuela(entity.getEscuela().getNombre());
    dto.setCuil(entity.getCuil());
    dto.setNombre(entity.getNombre());
    dto.setApellido(entity.getApellido());
    dto.setDomicilio(entity.getDomicilio());
    dto.setTelefono(entity.getTelefono());
    dto.setFechaDeNacimiento(entity.getFechaDeNacimiento());
    dto.setFechaDeIngreso(entity.getFechaDeIngreso());
    return dto;
  }

}

