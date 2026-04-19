package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
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

	@Query("""
			    select distinct d.rolEducativo
			    from Asignacion a
			    join a.designacion d
			    where a.empleadoEducativo.id = :empleadoId
			      and a.periodo.fechaDesde <= :fecha
			      and (a.periodo.fechaHasta is null or a.periodo.fechaHasta >= :fecha)
			""")
	Set<RolEducativo> obtenerRolesVigentesEnFecha(
			Long empleadoId,
			LocalDate fecha
	);

	@Query("""
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
			@Param("escuelaId") Long escuelaId,
			@Param("fecha") LocalDate fecha
	);

	Optional<Asignacion> findByIdAndDesignacionId(Long id, Long designacionId);

	@Modifying
	@Query("""
			    delete from Asignacion a
			    where type(a) = AsignacionSuplente
			      and a.designacion.id in :designacionesIds
			      and a.periodo.fechaDesde = :fechaDesde
			      and a.periodo.fechaHasta = :fechaHasta
			""")
	void eliminarSuplenciasDeLicencia(
			@Param("designacionesIds") List<Long> designacionesIds,
			@Param("fechaDesde") LocalDate fechaDesde,
			@Param("fechaHasta") LocalDate fechaHasta
	);

}
