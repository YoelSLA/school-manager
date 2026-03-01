package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DesignacionCursoRepository extends JpaRepository<DesignacionCurso, Long> {


	List<DesignacionCurso> findByEscuela(Escuela escuela);
}
