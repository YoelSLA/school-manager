package com.gestion.escuela.gestion_escolar.controllers.dtos;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.lang.String;

@Getter
@Setter
public class EmpleadoEducativoCreateDTO {

  @NotBlank
  private String nombreEscuela;

  @NotBlank(message = "cuil es obligatorio")
  private String cuil;

  @NotBlank(message = "nombre es obligatorio")
  private String nombre;

  @NotBlank(message = "apellido es obligatorio")
  private String apellido;

  private String domicilio;

  private String telefono;

  @NotBlank(message = "El mail es obligatorio")
  @Email(message = "El mail no tiene un formato válido")
  private String email;

  @NotNull(message = "fechaDeNacimiento es obligatoria")
  @Past(message = "fechaDeNacimiento debe ser en el pasado")
  private LocalDate fechaDeNacimiento;

  @NotNull(message = "fechaDeIngreso es obligatoria")
  @PastOrPresent(message = "fechaDeIngreso debe ser en el pasado o presente")
  private LocalDate fechaDeIngreso;

}

