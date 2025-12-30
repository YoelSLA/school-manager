package com.gestion.escuela.gestion_escolar.models.cupof;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CupofCurso extends Cupof {

  @ManyToOne(optional = false)
  private Materia materia;

  @ManyToOne(optional = false)
  private Curso curso;

  @Column(nullable = false)
  private String orientacion;

}
