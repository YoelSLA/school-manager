package com.gestion.escuela.gestion_escolar.controllers.dtos.curso.response;

import com.gestion.escuela.gestion_escolar.models.enums.Turno;

public record CursoRowDTO(Long id, Integer anio, Integer grado, String division, Turno turno) {}
