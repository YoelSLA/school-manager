package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

	List<Curso> findByEscuelaId(Long escuelaId);

	boolean existsByAnioAndGradoAndEscuelaId(Integer anio, Integer grado, Long escuelaId);

	List<Curso> findByEscuelaIdAndTurno(Long escuelaId, Turno turno);
}

