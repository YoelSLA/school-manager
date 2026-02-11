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
				where l.empleadoEducativo.escuela.id = :escuelaId
				  and l.licenciaAnterior is null
			""")
	List<Licencia> buscarRaicesPorEscuelaId(@Param("escuelaId") Long escuelaId);
}
