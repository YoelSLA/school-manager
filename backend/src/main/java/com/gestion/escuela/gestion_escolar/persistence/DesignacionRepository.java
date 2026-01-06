package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DesignacionRepository extends JpaRepository<Designacion, Long> {

	@Query("""
			    select d
			    from Designacion d
			    where type(d) = DesignacionAdministrativa and d.escuela.id = :escuelaId
			""")
	List<DesignacionAdministrativa> designacionesAdministrativasDeEscuela(@Param("escuelaId") Long escuelaId);

	@Query("""
			    select d
			    from Designacion d
			    where type(d) = DesignacionCurso and d.escuela.id = :escuelaId
			""")
	List<DesignacionCurso> designacionesCursosDeEscuela(Long escuelaId);
}