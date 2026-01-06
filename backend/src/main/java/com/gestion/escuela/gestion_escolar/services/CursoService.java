package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;

import java.util.List;

public interface CursoService {

	Curso obtenerPorId(Long id);

	Curso crear(Curso curso);

	List<Curso> buscarPorEscuela(Escuela escuela);

}