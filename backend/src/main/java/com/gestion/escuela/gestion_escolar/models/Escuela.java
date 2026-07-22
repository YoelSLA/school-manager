package com.gestion.escuela.gestion_escolar.models;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(
    name = "escuela",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"nombre", "localidad"})})
@Getter
public class Escuela {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String direccion;
  private String telefono;

  @Column(nullable = false)
  private String localidad;

  @Column(nullable = false)
  private String nombre;

  @Column(nullable = false)
  private boolean activa;

  protected Escuela() {
    this.activa = true;
  }

  public Escuela(String nombre, String localidad, String direccion, String telefono) {
    this.nombre = nombre;
    this.localidad = localidad;
    this.direccion = direccion;
    this.telefono = telefono;
    this.activa = true;
  }

  public void desactivar() {
    this.activa = false;
  }
}
