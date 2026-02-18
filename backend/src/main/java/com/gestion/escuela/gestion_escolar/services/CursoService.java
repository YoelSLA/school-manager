package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CursoService {


	Curso crear(Curso curso, Long escuelaId);

	void crearBatch(Long escuelaId, List<Curso> cursos);

	Curso obtenerPorId(Long id);

	Page<Curso> buscarPorEscuela(
			Long escuelaId,
			Turno turno,
			Pageable pageable
	);

	List<Curso> buscarTodosPorEscuela(Long escuelaId);
}