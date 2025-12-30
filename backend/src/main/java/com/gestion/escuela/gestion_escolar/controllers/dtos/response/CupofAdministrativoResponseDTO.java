package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.EmpleadoEducativoBasicoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CupofAdministrativoResponseDTO {

  private Long numeroCupof;
  protected String nombreEscuela;
  private EmpleadoEducativoBasicoResponseDTO empleado;
  private RolEducativo rolEducativo;
  private SituacionDeRevista situacionDeRevista;
  private List<FranjaHorariaResponseDTO> franjasHorarias;

}
