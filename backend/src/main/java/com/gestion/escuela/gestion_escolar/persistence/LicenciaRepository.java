package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LicenciaRepository extends JpaRepository<Licencia, Long> {

	List<Licencia> findByEscuela(Escuela escuela);

}
