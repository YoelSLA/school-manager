package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface EmpleadoEducativoService {

	EmpleadoEducativo crear(Long escuelaId, EmpleadoEducativo empleado);

	void crearBatch(List<EmpleadoEducativo> empleadoEducativos);

	EmpleadoEducativo obtenerPorId(Long id);

	Licencia crearLicencia(
			Long empleadoId,
			TipoLicencia tipo,
			Periodo periodo,
			String descripcion
	);

	void darDeBajaDefinitiva(
			Long empleadoId,
			LocalDate fechaBaja,
			CausaBaja causa
	);

	EmpleadoEducativo obtenerPorEscuela(Long escuelaId, Long empleadoId);

	List<EmpleadoEducativo> listarPorEscuela(Long escuelaId, Boolean estado);

	List<EmpleadoEducativo> buscarPorEscuela(Long escuelaId, String search);

	Set<RolEducativo> obtenerRolesEducativos(Long empleadoId);

	Set<LocalDate> diasLaborablesEnPeriodo(
			Long escuelaId,
			Long empleadoId,
			Periodo periodo
	);
}