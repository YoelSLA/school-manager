package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EscuelaRepository extends JpaRepository<Escuela, Long> {

	Optional<Escuela> findByNombreIgnoreCase(String nombre);

	Optional<Escuela> findByNombreIgnoreCaseAndActivaTrue(String nombre);

	List<Escuela> findAllByActivaTrue();
	
	boolean existsByNombreIgnoreCase(String nombre);

}

