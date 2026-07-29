package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface AsignacionRepository extends JpaRepository<Asignacion, Long> {

  @Query(
      """
			    select distinct d.rolEducativo
			    from Asignacion a
			    join a.designacion d
			    where a.empleadoEducativo.id = :empleadoId
			      and a.periodo.fechaDesde <= :fecha
			      and (a.periodo.fechaHasta is null or a.periodo.fechaHasta >= :fecha)
			""")
  Set<RolEducativo> obtenerRolesVigentesEnFecha(Long empleadoId, LocalDate fecha);

  @Query(
      """
			select d.rolEducativo as rol,
			       count(distinct a.empleadoEducativo.id) as cantidad
			from Asignacion a
			join a.designacion d
			where a.empleadoEducativo.escuela.id = :escuelaId
			  and a.periodo.fechaDesde <= :fecha
			  and (a.periodo.fechaHasta is null or a.periodo.fechaHasta >= :fecha)
			group by d.rolEducativo
			""")
  List<RolCantidadProjection> contarEmpleadosPorRolVigente(
      @Param("escuelaId") Long escuelaId, @Param("fecha") LocalDate fecha);

  Optional<Asignacion> findByIdAndDesignacionId(Long id, Long designacionId);

  @Modifying
  @Query(
      """
			    delete from Asignacion a
			    where type(a) = AsignacionSuplente
			      and a.designacion.id in :designacionesIds
			      and a.periodo.fechaDesde = :fechaDesde
			      and a.periodo.fechaHasta = :fechaHasta
			""")
  void eliminarSuplenciasDeLicencia(
      @Param("designacionesIds") List<Long> designacionesIds,
      @Param("fechaDesde") LocalDate fechaDesde,
      @Param("fechaHasta") LocalDate fechaHasta);

  @Query(
      """
    select (count(a) > 0)
    from Asignacion a
    where a.designacion.id = :designacionId
      and type(a) = :tipo
      and a.periodo.fechaDesde <= :fecha
      and (
            a.periodo.fechaHasta is null
            or a.periodo.fechaHasta >= :fecha
      )
""")
  boolean existeAsignacionActiva(
      @Param("designacionId") Long designacionId,
      @Param("tipo") Class<? extends Asignacion> tipo,
      @Param("fecha") LocalDate fecha);

  @Query(
      """
    select s
    from AsignacionSuplente s
    where s.designacion.id = :designacionId
      and s.periodo.fechaDesde <= :fecha
      and (
            s.periodo.fechaHasta is null
            or s.periodo.fechaHasta >= :fecha
      )
""")
  Optional<AsignacionSuplente> buscarSuplenciaActiva(
      @Param("designacionId") Long designacionId, @Param("fecha") LocalDate fecha);

  @Query(
      """
    select s
    from AsignacionSuplente s
    where s.designacion.id = :designacionId
      and s.licencia.id = :licenciaId
""")
  Optional<AsignacionSuplente> buscarSuplencia(
      @Param("designacionId") Long designacionId, @Param("licenciaId") Long licenciaId);

  @Query(
      """
    select a
    from Licencia l
         join l.asignaciones a
    where l.id = :licenciaId
      and a.designacion.id = :designacionId
""")
  Optional<Asignacion> buscarAsignacionAfectada(Long licenciaId, Long designacionId);

  @Query(
      """
        select count(a)
        from Asignacion a
        where a.empleadoEducativo.id = :empleadoId
          and a.bajaAsignacion is null
          and a.periodo.fechaDesde <= :fecha
          and (
                a.periodo.fechaHasta is null
                or a.periodo.fechaHasta >= :fecha
          )
    """)
  long contarActivas(@Param("empleadoId") Long empleadoId, @Param("fecha") LocalDate fecha);

  List<Asignacion> findByEmpleadoEducativoId(Long empleadoId);

  @Query("""
select a
from Asignacion a
where a.designacion.id = :designacionId

and not (

    a.periodo.fechaDesde <= :fecha

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

and a.periodo.fechaDesde > :fecha
""")
  List<Asignacion> findOtrosCargosPendientes(
		  @Param("designacionId") Long designacionId,
		  @Param("fecha") LocalDate fecha);

  @Query("""
select a
from Asignacion a
where a.designacion.id = :designacionId

and not (

    a.periodo.fechaDesde <= :fecha

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
  List<Asignacion> findOtrosCargosActivos(
		  @Param("designacionId") Long designacionId,
		  @Param("fecha") LocalDate fecha);

  @Query("""
select a
from Asignacion a
where a.designacion.id = :designacionId

and not (

    a.periodo.fechaDesde <= :fecha

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

and a.periodo.fechaHasta is not null
and a.periodo.fechaHasta < :fecha
""")
  List<Asignacion> findOtrosCargosFinalizados(
		  @Param("designacionId") Long designacionId,
		  @Param("fecha") LocalDate fecha);

  @Query("""
select a
from Asignacion a
where a.designacion.id = :designacionId

and not (

    a.periodo.fechaDesde <= :fecha

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

and a.bajaAsignacion is not null
and a.bajaAsignacion.fechaBaja <= :fecha
""")
  List<Asignacion> findOtrosCargosBaja(
		  @Param("designacionId") Long designacionId,
		  @Param("fecha") LocalDate fecha);

  @Query("""
select a
from Asignacion a
where a.designacion.id = :designacionId

and not (

    a.periodo.fechaDesde <= :fecha

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
  List<Asignacion> findOtrosCargos(
		  @Param("designacionId") Long designacionId,
		  @Param("fecha") LocalDate fecha);

  }

