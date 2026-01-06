package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;

import java.util.List;

public interface MateriaService {

	Materia obtenerPorId(Long id);

	Materia crear(Materia materia);

	List<Materia> buscarPorEscuela(Escuela escuela);
}
