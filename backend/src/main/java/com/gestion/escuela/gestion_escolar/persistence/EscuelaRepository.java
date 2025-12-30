package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofAdministrativo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EscuelaRepository  extends JpaRepository<Escuela, Long> {

  Optional<Escuela> findByNombreIgnoreCase(String nombre);

}
