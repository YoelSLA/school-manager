package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.cupof.CupofAdministrativo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CupofAdministrativoRepository
        extends JpaRepository<CupofAdministrativo, Long> {

  boolean existsByEscuela_IdAndNumeroCupof(Long escuelaId, Long numeroCupof);

  List<CupofAdministrativo> findByEscuela_Id(Long escuelaId);

}

