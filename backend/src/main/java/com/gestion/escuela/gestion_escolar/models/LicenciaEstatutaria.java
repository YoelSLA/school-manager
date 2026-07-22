package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(
    name = "licencia_estatutaria",
    uniqueConstraints = {@UniqueConstraint(columnNames = "codigo")})
@Getter
public class LicenciaEstatutaria {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /** Artículo del Estatuto Docente. Ej.: 114, 115, 121. */
  @Column(length = 20)
  private String articulo;

  /** Código identificador de la licencia. Ej.: A1, A2, 114F1, ART. */
  @Column(nullable = false, unique = true, length = 30)
  private String codigo;

  /** Nombre corto de la licencia. Ej.: "Enfermedad ordinaria". */
  @Column(nullable = false, length = 150)
  private String nombre;

  /** Descripción detallada según el Estatuto. */
  @Column(nullable = false, length = 2000)
  private String descripcion;

  /** Indica si la licencia continúa vigente. */
  @Column(nullable = false)
  private boolean activa = true;

  protected LicenciaEstatutaria() {}

  private LicenciaEstatutaria(Builder builder) {

    validar(builder.codigo, builder.nombre, builder.descripcion);

    this.articulo = builder.articulo;
    this.codigo = builder.codigo;
    this.nombre = builder.nombre;
    this.descripcion = builder.descripcion;
    this.activa = builder.activa;
  }

  public static Builder builder() {
    return new Builder();
  }

  public void actualizar(
      String articulo, String codigo, String nombre, String descripcion, boolean activa) {
    validar(codigo, nombre, descripcion);

    this.articulo = articulo;
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.activa = activa;
  }

  private void validar(String codigo, String nombre, String descripcion) {
    Validaciones.noBlank(codigo, "código");
    Validaciones.noBlank(nombre, "nombre");
    Validaciones.noBlank(descripcion, "descripción");
  }

  public static class Builder {

    private String articulo;
    private String codigo;
    private String nombre;
    private String descripcion;
    private boolean activa = true;

    public Builder articulo(String articulo) {
      this.articulo = articulo;
      return this;
    }

    public Builder codigo(String codigo) {
      this.codigo = codigo;
      return this;
    }

    public Builder nombre(String nombre) {
      this.nombre = nombre;
      return this;
    }

    public Builder descripcion(String descripcion) {
      this.descripcion = descripcion;
      return this;
    }

    public Builder activa(boolean activa) {
      this.activa = activa;
      return this;
    }

    public LicenciaEstatutaria build() {
      return new LicenciaEstatutaria(this);
    }
  }
}
