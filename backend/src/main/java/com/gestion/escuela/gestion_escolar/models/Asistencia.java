package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;

@Entity
@Table(
    name = "asistencia",
    uniqueConstraints = {
      @UniqueConstraint(columnNames = {"empleado_educativo_id", "escuela_id", "fecha"})
    })
@Getter
public class Asistencia extends AuditableEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  private EmpleadoEducativo empleadoEducativo;

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "escuela_id", nullable = false)
  private Escuela escuela;

  @Column(nullable = false)
  private LocalDate fecha;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private EstadoAsistencia estadoAsistencia;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "licencia_estatutaria_id")
  private LicenciaEstatutaria licenciaEstatutaria;

  private String observacion;

  protected Asistencia() {
    // JPA
  }

  public Asistencia(
      EmpleadoEducativo empleadoEducativo,
      LocalDate fecha,
      EstadoAsistencia estadoAsistencia,
      LicenciaEstatutaria licenciaEstatutaria,
      String observacion) {

    Validaciones.noNulo(empleadoEducativo, "empleadoEducativo");
    Validaciones.noNulo(fecha, "fecha");
    Validaciones.noNulo(estadoAsistencia, "estado asistencia");
    Validaciones.noNulo(licenciaEstatutaria, "licencia estatutaria");

    if (estadoAsistencia != EstadoAsistencia.AUSENTE) {
      throw new IllegalStateException("Solo se persisten asistencia AUSENTE");
    }

    this.escuela = empleadoEducativo.getEscuela();
    this.empleadoEducativo = empleadoEducativo;
    this.fecha = fecha;
    this.estadoAsistencia = estadoAsistencia;
    this.licenciaEstatutaria = licenciaEstatutaria;
    this.observacion = observacion;
  }

  public void actualizarManual(LicenciaEstatutaria licenciaEstatutaria, String observacion) {

    if (this.estadoAsistencia != EstadoAsistencia.AUSENTE) {
      throw new IllegalStateException("Solo se puede actualizar una asistencia AUSENTE");
    }

    this.licenciaEstatutaria = licenciaEstatutaria;
    this.observacion = observacion;
  }
}
