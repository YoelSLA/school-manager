package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Asistencia;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.EstadoAsistenciaDia;
import com.gestion.escuela.gestion_escolar.models.RolCantidad;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

public interface AsistenciaService {

	@Transactional(readOnly = true)
	List<Asistencia> asistenciasDe(Long empleadoId);

	@Transactional(readOnly = true)
	List<EstadoAsistenciaDia> obtenerEstadoMensual(
			Long escuelaId,
			Long empleadoId,
			YearMonth mes
	);

	List<RolCantidad> contarEmpleadosPorRolVigente(
			LocalDate fecha
	);

	Page<EmpleadoEducativo> buscarEmpleados(
			LocalDate fecha,
			List<RolEducativo> roles,
			String query,
			Pageable pageable
	);

	void registrarInasistenciasManuales(
			EmpleadoEducativo empleado,
			List<LocalDate> fechas,
			TipoLicencia tipoLicencia,
			String observacion
	);

	void eliminarInasistenciasManual(Long empleadoId, List<LocalDate> fechas);


}
