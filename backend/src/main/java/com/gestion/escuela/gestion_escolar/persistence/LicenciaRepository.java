package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LicenciaRepository extends JpaRepository<Licencia, Long> {

	@Query("""
			    select l
			    from Licencia l
			    join l.asignacion a
			    join a.designacion d
			    where d.escuela.id = :escuelaId
			""")
	List<Licencia> licenciasDeEscuela(@Param("escuelaId") Long escuelaId);
}
