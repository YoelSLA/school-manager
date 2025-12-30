package com.gestion.escuela.gestion_escolar.controllers.dtos;

import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CupofCursoCreateDTO {

  @NotBlank(message = "El CUIL es obligatorio")
  @Pattern(
          regexp = "\\d{2}-\\d{8}-\\d",
          message = "CUIL inválido"
  )
  private String cuil;

  @NotNull(message = "La materia es obligatoria")
  private Long materiaId;

  @NotNull(message = "El curso es obligatorio")
  private Long cursoId;

  @NotBlank(message = "La orientación es obligatoria")
  private String orientacion;

  @NotNull(message = "La situación de revista es obligatoria")
  private SituacionDeRevista situacion;

  @NotEmpty(message = "Debe informar al menos un horario")
  @Valid
  private List<FranjaHorariaDTO> horarios;
}



