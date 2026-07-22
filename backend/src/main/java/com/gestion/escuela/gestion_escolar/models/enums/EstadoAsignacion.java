package com.gestion.escuela.gestion_escolar.models.enums;

public enum EstadoAsignacion {
  PENDIENTE("Pendiente"),
  ACTIVA("Activa"),
  FINALIZADA("Finalizada"),
  BAJA("Baja");

  private final String descripcion;

  EstadoAsignacion(String descripcion) {
    this.descripcion = descripcion;
  }

  public String getDescripcion() {
    return descripcion;
  }

  public boolean estaVigente() {
    return this == ACTIVA;
  }

  public boolean estaFinalizada() {
    return this == FINALIZADA || this == BAJA;
  }
}
