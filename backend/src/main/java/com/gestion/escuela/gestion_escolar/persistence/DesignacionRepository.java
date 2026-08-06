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
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface DesignacionRepository extends JpaRepository<Designacion, Long> {

  @Query(
      """
				select d
				from Designacion d
				where d.escuela.id = :escuelaId
				and type(d) = DesignacionAdministrativa
			""")
  Page<DesignacionAdministrativa> findAdministrativasByEscuelaId(
      @Param("escuelaId") Long escuelaId, Pageable pageable);

  boolean existsByEscuelaIdAndCupof(Long escuelaId, Integer cupof);

  boolean existsByEscuelaIdAndCupofAndIdNot(Long escuelaId, Integer cupof, Long designacionId);

  List<Designacion> findByEscuelaIdAndCupofIn(Long escuelaId, Set<Integer> cupofs);

  @Query(
      """
		select d
		from DesignacionCurso d
		where d.id = :id
			""")
  Optional<DesignacionCurso> findCursoById(@Param("id") Long id);

  @Query(
      """
		select d
		from DesignacionAdministrativa d
		where d.id = :id
			""")
  Optional<DesignacionAdministrativa> findAdministrativaById(@Param("id") Long id);

  @EntityGraph(
      attributePaths = {
        "asignaciones",
        "asignaciones.empleadoEducativo",
        "asignaciones.empleadoEducativo.licencias"
      })
  Optional<Designacion> findById(Long id);

  @Query(
      """
    select a
    from Asignacion a
    where a.designacion.id = :designacionId

      and a.periodo.fechaDesde <= :fecha

      and (
            a.periodo.fechaHasta is null
            or a.periodo.fechaHasta >= :fecha
      )

      and (
            a.bajaAsignacion is null
            or a.bajaAsignacion.fechaBaja > :fecha
      )

      and not exists (

            select 1
            from Licencia l

            join l.asignaciones la

            where la = a

              and l.periodo.fechaDesde <= :fecha

              and (
                    l.periodo.fechaHasta is null
                    or l.periodo.fechaHasta >= :fecha
              )
      )
""")
  Optional<Asignacion> findAsignacionQueEjerceEn(
      @Param("designacionId") Long designacionId, @Param("fecha") LocalDate fecha);

	@Query("""
    select a
    from Asignacion a
    where a.designacion.id = :designacionId

      and a.periodo.fechaDesde <= :fecha

      and (
            a.periodo.fechaHasta is null
            or a.periodo.fechaHasta >= :fecha
      )

      and (
            a.bajaAsignacion is null
            or a.bajaAsignacion.fechaBaja > :fecha
      )
""")
	Optional<Asignacion> findAsignacionVigenteEn(
			@Param("designacionId") Long designacionId,
			@Param("fecha") LocalDate fecha);

  @Query(
      """
select d
from DesignacionCurso d
where d.escuela.id = :escuelaId

  and (:cursoId is null or d.curso.id = :cursoId)
  and (:materiaId is null or d.materia.id = :materiaId)
  and (:orientacion is null or d.orientacion = :orientacion)

order by
    d.curso.anio,
    d.curso.grado,
    d.materia.nombre,
    d.cupof
""")
  Page<DesignacionCurso> buscarCursosSinEstado(
      @Param("escuelaId") Long escuelaId,
      @Param("cursoId") Long cursoId,
      @Param("materiaId") Long materiaId,
      @Param("orientacion") String orientacion,
      Pageable pageable);

  @Query(
      """
select d
from DesignacionCurso d
where d.escuela.id = :escuelaId

  and (:cursoId is null or d.curso.id = :cursoId)
  and (:materiaId is null or d.materia.id = :materiaId)
  and (:orientacion is null or d.orientacion = :orientacion)

  and exists (
      select 1
      from Asignacion a
      where a.designacion.id = d.id

        and a.periodo.fechaDesde <= :fecha

        and (
            a.periodo.fechaHasta is null
            or a.periodo.fechaHasta >= :fecha
        )

        and (
            a.bajaAsignacion is null
            or a.bajaAsignacion.fechaBaja > :fecha
        )

        and not exists (
            select 1
            from Licencia l
            join l.asignaciones la
            where la = a
              and l.periodo.fechaDesde <= :fecha
              and (
                    l.periodo.fechaHasta is null
                    or l.periodo.fechaHasta >= :fecha
              )
        )
  )

order by
    d.curso.anio,
    d.curso.grado,
    d.materia.nombre,
    d.cupof
""")
  Page<DesignacionCurso> buscarCursosCubiertos(
      @Param("escuelaId") Long escuelaId,
      @Param("cursoId") Long cursoId,
      @Param("materiaId") Long materiaId,
      @Param("orientacion") String orientacion,
      @Param("fecha") LocalDate fecha,
      Pageable pageable);

  @Query(
      """
select d
from DesignacionCurso d
where d.escuela.id = :escuelaId

  and (:cursoId is null or d.curso.id = :cursoId)
  and (:materiaId is null or d.materia.id = :materiaId)
  and (:orientacion is null or d.orientacion = :orientacion)

  and not exists (
      select 1
      from Asignacion a
      where a.designacion.id = d.id

        and a.periodo.fechaDesde <= :fecha

        and (
            a.periodo.fechaHasta is null
            or a.periodo.fechaHasta >= :fecha
        )

        and (
            a.bajaAsignacion is null
            or a.bajaAsignacion.fechaBaja > :fecha
        )

        and not exists (
            select 1
            from Licencia l
            join l.asignaciones la
            where la = a
              and l.periodo.fechaDesde <= :fecha
              and (
                    l.periodo.fechaHasta is null
                    or l.periodo.fechaHasta >= :fecha
              )
        )
  )

order by
    d.curso.anio,
    d.curso.grado,
    d.materia.nombre,
    d.cupof
""")
  Page<DesignacionCurso> buscarCursosVacantes(
      @Param("escuelaId") Long escuelaId,
      @Param("cursoId") Long cursoId,
      @Param("materiaId") Long materiaId,
      @Param("orientacion") String orientacion,
      @Param("fecha") LocalDate fecha,
      Pageable pageable);

  @Query(
      """
select distinct d.id
from Designacion d
where d.id in :designacionIds

  and exists (
      select 1
      from Asignacion a
      where a.designacion = d

        and a.periodo.fechaDesde <= :fecha

        and (
            a.periodo.fechaHasta is null
            or a.periodo.fechaHasta >= :fecha
        )

        and (
            a.bajaAsignacion is null
            or a.bajaAsignacion.fechaBaja > :fecha
        )

        and not exists (
            select 1
            from Licencia l
            join l.asignaciones la
            where la = a
              and l.periodo.fechaDesde <= :fecha
              and (
                    l.periodo.fechaHasta is null
                    or l.periodo.fechaHasta >= :fecha
              )
        )
  )
""")
  Set<Long> buscarDesignacionesCubiertas(
      @Param("designacionIds") Set<Long> designacionIds, @Param("fecha") LocalDate fecha);

  @Query(
      """
    select distinct a.designacion.id
    from Asignacion a
    where a.designacion.id in :designacionIds

      and a.periodo.fechaDesde <= :fecha

      and (
            a.periodo.fechaHasta is null
            or a.periodo.fechaHasta >= :fecha
      )

      and (
            a.bajaAsignacion is null
            or a.bajaAsignacion.fechaBaja > :fecha
      )

      and not exists (
            select 1
            from Licencia l
            join l.asignaciones la
            where la = a
              and l.periodo.fechaDesde <= :fecha
              and (
                    l.periodo.fechaHasta is null
                    or l.periodo.fechaHasta >= :fecha
              )
      )
""")
  List<Long> findDesignacionesCubiertas(
      @Param("designacionIds") Collection<Long> designacionIds, @Param("fecha") LocalDate fecha);

  @Query(
      """
    select a
    from Asignacion a
    where a.designacion.id in :designacionIds

      and a.periodo.fechaDesde <= :fecha

      and (
            a.periodo.fechaHasta is null
            or a.periodo.fechaHasta >= :fecha
      )

      and (
            a.bajaAsignacion is null
            or a.bajaAsignacion.fechaBaja > :fecha
      )

      and not exists (

            select 1
            from Licencia l

            join l.asignaciones la

            where la = a

              and l.periodo.fechaDesde <= :fecha

              and (
                    l.periodo.fechaHasta is null
                    or l.periodo.fechaHasta >= :fecha
              )
      )
""")
  List<Asignacion> findAsignacionesQueEjercenEn(
      @Param("designacionIds") Collection<Long> designacionIds, @Param("fecha") LocalDate fecha);
}
