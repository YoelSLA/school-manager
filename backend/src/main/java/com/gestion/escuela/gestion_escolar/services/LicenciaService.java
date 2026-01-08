package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;

import java.util.List;

public interface LicenciaService {

	Licencia obtenerPorId(Long id);

	List<Licencia> buscarPorEscuela(Escuela escuela);

	List<Asignacion> obtenerAsignacionesAfectadas(Long licenciaId);
}

