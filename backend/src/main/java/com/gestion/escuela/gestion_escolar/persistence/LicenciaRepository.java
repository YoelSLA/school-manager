package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Set;

public interface LicenciaRepository extends JpaRepository<Licencia, Long> {

	@EntityGraph(attributePaths = {
			"empleadoEducativo",

			"asignaciones",
			"asignaciones.empleadoEducativo",
			"asignaciones.empleadoEducativo.licencias",

			"asignaciones.designacion",
			"asignaciones.designacion.asignaciones",
			"asignaciones.designacion.asignaciones.empleadoEducativo",
			"asignaciones.designacion.asignaciones.empleadoEducativo.licencias"
	})
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

	@Query("""
        select distinct l.empleadoEducativo.id
        from Licencia l
        where l.licenciaAnterior is null
          and l.periodo.fechaDesde <= :fecha
          and (
                l.periodo.fechaHasta is null
                or l.periodo.fechaHasta >= :fecha
          )
    """)
	Set<Long> buscarEmpleadosConLicenciaEn(
			@Param("fecha") LocalDate fecha
	);
}