package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Asistencia;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

	List<Asistencia> findByEmpleadoEducativoId(Long empleadoId);

	List<Asistencia> findByEmpleadoEducativoIdAndEscuelaIdAndFechaBetween(
			Long empleadoId,
			Long escuelaId,
			LocalDate desde,
			LocalDate hasta
	);

	List<Asistencia> findByEmpleadoEducativoIdAndEscuelaIdAndFechaIn(
			Long id,
			Long escuelaId,
			List<LocalDate> fechas
	);

	List<Asistencia> findByEmpleadoEducativoIdAndFechaBetween(
			Long empleadoId,
			LocalDate desde,
			LocalDate hasta
	);

	long countByEmpleadoEducativoIdAndFechaBetweenAndEstadoAsistenciaIn(
			Long empleadoId,
			LocalDate desde,
			LocalDate hasta,
			List<EstadoAsistencia> estados
	);

	@Query("""
			SELECT a.tipoLicencia
			FROM Asistencia a
			WHERE a.empleadoEducativo.id = :empleadoId
				AND a.fecha BETWEEN :desde AND :hasta
				AND a.tipoLicencia IS NOT NULL
			GROUP BY a.tipoLicencia
			ORDER BY COUNT(a) DESC
			LIMIT 1
			""")
	Optional<TipoLicencia> findTipoLicenciaMasFrecuenteDelMes(
			@Param("empleadoId") Long empleadoId,
			@Param("desde") LocalDate desde,
			@Param("hasta") LocalDate hasta
	);

	Optional<Asistencia> findByEmpleadoEducativoIdAndEscuelaIdAndFecha(
			Long empleadoId,
			Long escuelaId,
			LocalDate fecha
	);
}

