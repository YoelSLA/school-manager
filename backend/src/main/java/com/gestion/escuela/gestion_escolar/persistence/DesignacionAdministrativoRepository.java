package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DesignacionAdministrativoRepository extends JpaRepository<DesignacionAdministrativa, Long> {

	boolean existsByEscuela_IdAndCupof(Long escuelaId, Integer cupof);

	List<DesignacionAdministrativa> findByEscuela(Escuela escuela);


}

