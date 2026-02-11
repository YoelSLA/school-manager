package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmpleadoEducativoRepository extends JpaRepository<EmpleadoEducativo, Long> {


	boolean existsByEmailAndEscuelaId(String email, Long escuelaId);

	boolean existsByCuilAndEscuelaId(String cuil, Long escuelaId);

	List<EmpleadoEducativo> findByEscuelaId(Long escuelaId);

	@Query("""
				select e from EmpleadoEducativo e
				where e.escuela.id = :escuelaId
				and (
					lower(e.apellido) like %:search%
					or lower(e.nombre) like %:search%
					or e.cuil like %:search%
				)
			""")
	List<EmpleadoEducativo> buscarPorEscuelaYTexto(
			Long escuelaId,
			String search
	);

	@Query("""
				select distinct e
				from EmpleadoEducativo e
				join e.asignaciones a
				join a.designacion d
				where
					a.periodo.fechaDesde <= :fecha
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
	List<EmpleadoEducativo> buscarEmpleadosConRolVigente(
			@Param("fecha") LocalDate fecha,
			@Param("roles") List<RolEducativo> roles,
			@Param("query") String query
	);

	List<EmpleadoEducativo> findByEscuelaIdAndActivo(Long escuelaId, boolean estado);


}