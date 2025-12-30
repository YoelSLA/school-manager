package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpleadoEducativoRepository
        extends JpaRepository<EmpleadoEducativo, Long> {

  boolean existsByCuil(String cuil);
  Optional<EmpleadoEducativo> findByCuil(String cuil);
}