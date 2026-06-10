package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
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

	boolean existsByEscuelaIdAndCupof(Long escuelaId, Integer cupof);

	boolean existsByEscuelaIdAndCupofAndIdNot(Long escuelaId, Integer cupof, Long designacionId);

	List<Designacion> findByEscuelaIdAndCupofIn(Long escuelaId, Set<Integer> cupofs);

	/* =====================================================
	   CURSOS CON FILTRO (CURSO / MATERIA / ORIENTACION / ESTADO)
	===================================================== */

	@Query("""
			select d
			from DesignacionCurso d
			where d.escuela.id = :escuelaId
			  and (:cursoId is null or d.curso.id = :cursoId)
			  and (:materiaId is null or d.materia.id = :materiaId)
			  and (:orientacion is null or d.orientacion = :orientacion)
			order by
			    d.curso.anio asc,
			    d.curso.grado asc,
			    d.materia.nombre asc,
			    d.cupof asc
			""")
	List<DesignacionCurso> buscarCursosConFiltro(
			Long escuelaId,
			Long cursoId,
			Long materiaId,
			String orientacion
	);

	/* =====================================================
	   CONSULTAS SIMPLES
	===================================================== */

	@Query("""
				select d
				from DesignacionCurso d
				where d.escuela.id = :escuelaId
			""")
	List<DesignacionCurso> findCursosByEscuelaIdList(Long escuelaId);

	@Query("""
				select d
				from DesignacionCurso d
				where d.id = :id
			""")
	Optional<DesignacionCurso> findCursoById(@Param("id") Long id);

	@Query("""
				select d
				from DesignacionAdministrativa d
				where d.id = :id
			""")
	Optional<DesignacionAdministrativa> findAdministrativaById(@Param("id") Long id);

	/* =====================================================
	   ASIGNACION ACTIVA
	===================================================== */

	@Query("""
				select a
				from Asignacion a
				where a.designacion.id = :designacionId
				  and a.periodo.fechaDesde <= :fecha
				  and (a.periodo.fechaHasta is null or a.periodo.fechaHasta >= :fecha)
			""")
	Optional<Asignacion> findAsignacionActiva(
			@Param("designacionId") Long designacionId,
			@Param("fecha") LocalDate fecha
	);

	@EntityGraph(attributePaths = {
			"asignaciones",
			"asignaciones.empleadoEducativo",
			"asignaciones.empleadoEducativo.licencias"
	})
	@Override
	Optional<Designacion> findById(Long id);

}