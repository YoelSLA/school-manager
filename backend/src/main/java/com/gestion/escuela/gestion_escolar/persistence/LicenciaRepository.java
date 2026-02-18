package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LicenciaRepository extends JpaRepository<Licencia, Long> {

	@Query(
			value = """
					select l
					from Licencia l
					where l.empleadoEducativo.escuela.id = :escuelaId
					  and l.licenciaAnterior is null
					""",
			countQuery = """
					select count(l)
					from Licencia l
					where l.empleadoEducativo.escuela.id = :escuelaId
					  and l.licenciaAnterior is null
					"""
	)
	Page<Licencia> buscarRaicesPorEscuelaId(
			@Param("escuelaId") Long escuelaId,
			Pageable pageable
	);

}
