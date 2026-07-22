package com.gestion.escuela.gestion_escolar.models;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class EscuelaTest {

  @Test
  void escuelaSeCreaActiva() {
    Escuela escuela = escuelaValida();

    assertTrue(escuela.isActiva());
  }

  private Escuela escuelaValida() {
    return new Escuela("Escuela N°1", "Quilmes", "Av. Siempre Viva 123", "11-1234-5678");
  }
}
