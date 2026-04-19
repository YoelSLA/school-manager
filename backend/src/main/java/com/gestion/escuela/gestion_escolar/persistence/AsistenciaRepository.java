package com.gestion.escuela.gestion_escolar.persistence;

import com.gestion.escuela.gestion_escolar.models.Asistencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

	List<Asistencia> findByEmpleadoEducativoId(Long empleadoId);
	
	List<Asistencia> findByEmpleadoEducativoIdAndEscuelaIdAndFechaBetween(
			Long empleadoId,
			Long escuelaId,
			LocalDate desde,
			LocalDate hasta
	);

	List<Asistencia> findByEmpleadoEducativoIdAndEscuelaIdAndFechaIn(Long id, Long escuelaId, List<LocalDate> fechas);
}

