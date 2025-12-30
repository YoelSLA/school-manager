package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.cupof.Cupof;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Getter
@Setter
public class FranjaHoraria {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false)
  private Cupof cupof;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private DiaDeSemana dia;

  @Column(nullable = false)
  private LocalTime horaDesde;

  @Column(nullable = false)
  private LocalTime horaHasta;


}
