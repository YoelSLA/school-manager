package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DesignacionRepository extends JpaRepository<Designacion, Long> {

	@Query("""
			select d
			from Designacion d
			where d.escuela.id = :escuelaId
			  and type(d) = :tipo
			""")
	<T extends Designacion> Page<T> findByEscuelaIdAndTipo(
			@Param("escuelaId") Long escuelaId,
			@Param("tipo") Class<T> tipo,
			Pageable pageable
	);


}