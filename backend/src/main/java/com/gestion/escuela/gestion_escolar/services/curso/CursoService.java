package com.gestion.escuela.gestion_escolar.services.curso;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CursoService {

  void crearBatch(Long escuelaId, List<Curso> cursos);

  void eliminar(Long escuelaId, Long cursoId);

  Curso crear(Long escuelaId, Curso curso);

  Curso obtenerPorId(Long cursoId);

  Curso actualizar(Long escuelaId, Long cursoId, Integer anio, Integer grado, Turno turno);

  List<Curso> listarCursosPorEscuela(Long escuelaId);

  Page<Curso> listarCursosPorEscuela(Long escuelaId, Turno turno, Pageable pageable);
}
