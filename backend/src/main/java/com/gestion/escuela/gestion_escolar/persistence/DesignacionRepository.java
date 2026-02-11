package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DesignacionRepository extends JpaRepository<Designacion, Long> {

	@Query("""
			select d
			from Designacion d
			where d.escuela.id = :escuelaId
			  and type(d) = :tipo
			""")
	<T extends Designacion> List<T> findByEscuelaIdAndTipo(
			@Param("escuelaId") Long escuelaId,
			@Param("tipo") Class<T> tipo
	);

}