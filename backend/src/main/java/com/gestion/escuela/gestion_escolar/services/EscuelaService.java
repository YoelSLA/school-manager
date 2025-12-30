package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Escuela;

public interface EscuelaService {

  Escuela obtenerOCrearPorNombre(String nombreEscuela);

  Escuela obtenerPorNombre(String nombreEscuela);
}
