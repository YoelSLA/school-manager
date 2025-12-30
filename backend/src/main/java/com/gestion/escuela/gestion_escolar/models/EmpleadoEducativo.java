package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "empleado_educativo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmpleadoEducativo {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  @JoinColumn(name = "id_escuela")
  private Escuela escuela;

  @Column(nullable = false, unique = true)
  private String cuil;

  @Column(nullable = false)
  private String nombre;

  @Column(nullable = false)
  private String apellido;

  private String domicilio;

  private String telefono;

  @Column(nullable = false)
  private LocalDate fechaDeNacimiento;

  @Column(nullable = false)
  private LocalDate fechaDeIngreso;

  @Column(nullable = false, unique = true)
  private String email;

}
