package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

import java.time.LocalDate;
import java.util.List;

public interface EmpleadoEducativoService {

	EmpleadoEducativo crear(EmpleadoEducativo empleado);

	EmpleadoEducativo obtenerPorId(Long id);

	List<EmpleadoEducativo> buscarPorEscuela(Long escuelaId, String search);

	Licencia crearLicencia(
			Long empleadoId,
			TipoLicencia tipo,
			LocalDate desde,
			LocalDate hasta,
			String descripcion
	);

	EmpleadoEducativo obtenerPorEscuela(Long escuelaId, Long empleadoId);

	List<Asignacion> obtenerAsignacionesActivas(Long empleadoId);
}