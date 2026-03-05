package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CursoService {

	void crearBatch(Long escuelaId, List<Curso> cursos);

	void eliminar(Long escuelaId, Long cursoId);

	Curso crear(Long escuelaId, Curso curso);

	Curso obtenerPorId(Long id);

	Curso actualizar(Long escuelaId, Long cursoId, Integer anio, Integer grado, Turno turno);

	List<Curso> listarCursosPorEscuela(Long escuelaId);

	Page<Curso> listarCursosPorEscuela(Long escuelaId, Turno turno, Pageable pageable);

}