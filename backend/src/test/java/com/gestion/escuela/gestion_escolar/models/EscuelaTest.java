package com.gestion.escuela.gestion_escolar.models;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

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
