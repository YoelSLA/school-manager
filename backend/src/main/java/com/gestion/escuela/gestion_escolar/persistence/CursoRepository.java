package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
}

