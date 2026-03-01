package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Asistencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

	List<Asistencia> findByEmpleadoEducativoId(Long empleadoId);

	List<Asistencia> findByEmpleadoEducativoIdAndFechaIn(Long empleadoId, List<LocalDate> fechas);

	List<Asistencia> findByEmpleadoEducativoIdAndEscuelaIdAndFechaBetween(
			Long empleadoId,
			Long escuelaId,
			LocalDate desde,
			LocalDate hasta
	);
}

