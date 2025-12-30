package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class FranjaHorariaResponseDTO {

  private DiaDeSemana dia;
  private LocalTime desde;
  private LocalTime hasta;

}

