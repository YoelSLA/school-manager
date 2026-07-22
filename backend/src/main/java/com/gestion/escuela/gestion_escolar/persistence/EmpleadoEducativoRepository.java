package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoEducativoRepository extends JpaRepository<EmpleadoEducativo, Long> {

  boolean existsByEmailAndEscuelaId(String email, Long escuelaId);

  boolean existsByCuilAndEscuelaId(String cuil, Long escuelaId);

  boolean existsByCuilAndEscuelaIdAndIdNot(String cuil, Long escuelaId, Long empleadoId);

  boolean existsByEmailAndEscuelaIdAndIdNot(String email, Long escuelaId, Long empleadoId);

  @Query(
      """
				select e from EmpleadoEducativo e
				where e.escuela.id = :escuelaId
				and (
					lower(e.apellido) like %:search%
					or lower(e.nombre) like %:search%
					or e.cuil like %:search%
				)
			""")
  List<EmpleadoEducativo> buscarPorEscuelaYTexto(Long escuelaId, String search);

  @Query(
      value =
          """
					select distinct e
					from EmpleadoEducativo e
					join e.asignaciones a
					join a.designacion d
					where
					    e.escuela.id = :escuelaId
					and a.periodo.fechaDesde <= :fecha
					and (a.periodo.fechaHasta is null or a.periodo.fechaHasta >= :fecha)
					and (
					    :roles is null
					    or d.rolEducativo in :roles
					)
					and (
					    :query is null
					    or cast(e.apellido as string) ilike concat('%', cast(:query as string), '%')
					    or cast(e.nombre as string)   ilike concat('%', cast(:query as string), '%')
					    or cast(e.cuil as string)     ilike concat('%', cast(:query as string), '%')
					)
					""",
      countQuery =
          """
					select count(distinct e)
					from EmpleadoEducativo e
					join e.asignaciones a
					join a.designacion d
					where
					    e.escuela.id = :escuelaId
					and a.periodo.fechaDesde <= :fecha
					and (a.periodo.fechaHasta is null or a.periodo.fechaHasta >= :fecha)
					and (
					    :roles is null
					    or d.rolEducativo in :roles
					)
					and (
					    :query is null
					    or cast(e.apellido as string) ilike concat('%', cast(:query as string), '%')
					    or cast(e.nombre as string)   ilike concat('%', cast(:query as string), '%')
					    or cast(e.cuil as string)     ilike concat('%', cast(:query as string), '%')
					)
					""")
  Page<EmpleadoEducativo> buscarEmpleadosConRolVigente(
      @Param("escuelaId") Long escuelaId,
      @Param("fecha") LocalDate fecha,
      @Param("roles") List<RolEducativo> roles,
      @Param("query") String query,
      Pageable pageable);

  Page<EmpleadoEducativo> findByEscuelaId(Long escuelaId, Pageable pageable);

  Page<EmpleadoEducativo> findByEscuelaIdAndActivo(
      Long escuelaId, Boolean activo, Pageable pageable);

  @Query(
      """
    SELECT DISTINCT d.rolEducativo
    FROM EmpleadoEducativo e
        JOIN e.asignaciones a
        JOIN a.designacion d
    WHERE e.id = :empleadoId
      AND a.periodo.fechaDesde <= :fecha
      AND (
            a.periodo.fechaHasta IS NULL
            OR a.periodo.fechaHasta >= :fecha
      )
      AND (
            a.bajaAsignacion IS NULL
            OR a.bajaAsignacion.fechaBaja > :fecha
      )
""")
  List<RolEducativo> obtenerRolesActivosEn(
      @Param("empleadoId") Long empleadoId, @Param("fecha") LocalDate fecha);
}
