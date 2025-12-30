package com.gestion.escuela.gestion_escolar.models.cupof;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "cupof",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"id_escuela", "numero_cupof"}
                )
        }
)
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
public abstract class Cupof {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  protected Long id;

  @Column(nullable = false)
  protected Long numeroCupof;

  @ManyToOne(optional = false)
  @JoinColumn(name = "id_escuela", nullable = false)
  protected Escuela escuela;

  @Enumerated(EnumType.STRING)
  protected SituacionDeRevista situacionDeRevista;

  @OneToMany(
          mappedBy = "cupof",
          cascade = CascadeType.ALL,
          orphanRemoval = true
  )
  protected List<FranjaHoraria> franjasHorarias = new ArrayList<>();

  @ManyToOne
  @JoinColumn(name = "empleado_id")
  private EmpleadoEducativo empleadoEducativo;

  @Column(nullable = false)
  private RolEducativo rolEducativo;

}
