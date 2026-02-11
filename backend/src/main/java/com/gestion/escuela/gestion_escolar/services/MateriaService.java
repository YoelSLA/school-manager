package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Materia;

import java.util.List;

public interface MateriaService {

	Materia crear(Long escuelaId, Materia materia);

	void crearBatch(Long escuelaId, List<Materia> materias);

	Materia obtenerPorId(Long id);

	List<Materia> buscarPorEscuela(Long escuelaId);
}
