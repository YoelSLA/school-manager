package com.gestion.escuela.gestion_escolar.controllers.dtos;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CupofAdministrativoCreateDTO {

  @NotNull(message = "El número de cupof es obligatorio")
  private Long numeroCupof;

  @NotBlank(message = "El nombre de la escuela es obligatorio")
  private String nombreEscuela;

  @NotEmpty(message = "Debe informar al menos un horario")
  private List<FranjaHorariaDTO> horarios;

  @Pattern(
          regexp = "\\d{2}-\\d{8}-\\d",
          message = "CUIL inválido"
  )
  private String cuil;

  @NotNull(message = "El rol educativo es obligatorio")
  private RolEducativo rolEducativo;

  private SituacionDeRevista situacionDeRevista;
}


