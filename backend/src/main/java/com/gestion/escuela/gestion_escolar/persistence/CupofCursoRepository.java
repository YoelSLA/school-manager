package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofCurso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CupofCursoRepository
        extends JpaRepository<CupofCurso, Long> {

	boolean existsByCursoAndMateriaAndOrientacion(
			Curso curso,
			Materia materia,
			String orientacion
	);

}
