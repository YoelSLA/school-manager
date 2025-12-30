package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;

import java.util.List;
import java.util.Optional;

public interface EmpleadoEducativoService {

  EmpleadoEducativo crear(EmpleadoEducativo empleado, Escuela escuela);

  List<EmpleadoEducativo> listar();

  boolean existeCuil(String cuil);

  void eliminarPorCuil(String cuil);

  Optional<EmpleadoEducativo> buscarPorCuil(String cuil);
}