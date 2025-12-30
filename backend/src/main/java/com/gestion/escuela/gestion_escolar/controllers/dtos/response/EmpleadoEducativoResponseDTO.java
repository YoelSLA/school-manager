package com.gestion.escuela.gestion_escolar.controllers.dtos.response;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class EmpleadoEducativoResponseDTO {

  private String nombreEscuela;
  private String cuil;
  private String nombre;
  private String apellido;
  private String domicilio;
  private String telefono;
  private LocalDate fechaDeNacimiento;
  private LocalDate fechaDeIngreso;

}
