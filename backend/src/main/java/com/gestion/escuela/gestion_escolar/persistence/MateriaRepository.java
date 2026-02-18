package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Materia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {

	boolean existsByNombreIgnoreCaseAndEscuelaId(String nombre, Long escuelaId);

	Page<Materia> findByEscuelaId(Long escuelaId, Pageable pageable);

	List<Materia> findByEscuelaIdOrderByNombreAsc(Long escuelaId);
}