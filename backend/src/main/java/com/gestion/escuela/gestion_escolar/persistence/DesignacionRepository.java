package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface DesignacionRepository extends JpaRepository<Designacion, Long> {

	@Query("""
			 select d
			 from Designacion d
			 where d.escuela.id = :escuelaId
			   and type(d) = DesignacionCurso
			""")
	Page<DesignacionCurso> findCursosByEscuelaId(
			@Param("escuelaId") Long escuelaId,
			Pageable pageable
	);

	@Query("""
			 select d
			 from Designacion d
			 where d.escuela.id = :escuelaId
			   and type(d) = DesignacionAdministrativa
			""")
	Page<DesignacionAdministrativa> findAdministrativasByEscuelaId(
			@Param("escuelaId") Long escuelaId,
			Pageable pageable
	);

	boolean existsByEscuelaIdAndCupof(Long id, Integer cupof);

	List<Designacion> findByEscuelaIdAndCupofIn(Long escuelaId, Set<Integer> cupofs);

	@Query("""
			select d
			from DesignacionCurso d
			where d.escuela.id = :escuelaId
			  and (:cursoId is null or d.curso.id = :cursoId)
			  and (:materiaId is null or d.materia.id = :materiaId)
			  and (:orientacion is null or d.orientacion = :orientacion)
			""")
	Page<DesignacionCurso> buscarCursosConFiltro(
			@Param("escuelaId") Long escuelaId,
			@Param("cursoId") Long cursoId,
			@Param("materiaId") Long materiaId,
			@Param("orientacion") String orientacion,
			Pageable pageable
	);

	@Query("""
			select d
			from DesignacionCurso d
			where d.escuela.id = :escuelaId
			""")
	List<DesignacionCurso> findCursosByEscuelaId(Long escuelaId);


	@Query("""
			select d
			from DesignacionCurso d
			where d.escuela.id = :escuelaId
			  and (:cursoId is null or d.curso.id = :cursoId)
			  and (:materiaId is null or d.materia.id = :materiaId)
			  and (:orientacion is null or d.orientacion = :orientacion)
			  and (
			       :estado is null
			       or
			       (:estado = 'CUBIERTA' and exists (
			             select a
			             from Asignacion a
			             where a.designacion = d
			               and a.bajaAsignacion is null
			               and a.periodo.fechaDesde <= current_date
			               and (a.periodo.fechaHasta is null or a.periodo.fechaHasta >= current_date)
			       ))
			       or
			       (:estado = 'VACANTE' and not exists (
			             select a
			             from Asignacion a
			             where a.designacion = d
			               and a.bajaAsignacion is null
			               and a.periodo.fechaDesde <= current_date
			               and (a.periodo.fechaHasta is null or a.periodo.fechaHasta >= current_date)
			       ))
			  )
			""")
	Page<DesignacionCurso> buscarCursosConFiltro(
			Long escuelaId,
			Long cursoId,
			Long materiaId,
			String orientacion,
			String estado,
			Pageable pageable
	);

	@Query("""
			SELECT d
			FROM DesignacionCurso d
			WHERE d.id = :id
			""")
	Optional<DesignacionCurso> findCursoById(@Param("id") Long id);

	boolean existsByEscuelaIdAndCupofAndIdNot(Long escuelaId, Integer cupof, Long designacionId);

	@Query("""
			SELECT d
			FROM DesignacionAdministrativa d
			WHERE d.id = :id
			""")
	Optional<DesignacionAdministrativa> findAdministrativaById(@Param("id") Long id);
}