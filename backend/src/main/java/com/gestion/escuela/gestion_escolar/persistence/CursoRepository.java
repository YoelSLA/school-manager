package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

	Page<Curso> findByEscuelaId(
			Long escuelaId,
			Pageable pageable
	);

	boolean existsByAnioAndGradoAndEscuelaId(Integer anio, Integer grado, Long escuelaId);

	Page<Curso> findByEscuelaIdAndTurno(
			Long escuelaId,
			Turno turno,
			Pageable pageable
	);

	List<Curso> findByEscuelaId(Long escuelaId);
}

