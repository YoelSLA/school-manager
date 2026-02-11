package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

import java.time.LocalDate;
import java.util.List;

public interface LicenciaService {

	Licencia obtenerPorId(Long id);

	List<Licencia> buscarPorEscuela(Long escuelaId);

	Licencia renovarLicencia(
			Long licenciaId,
			TipoLicencia nuevoTipo,
			LocalDate nuevoHasta,
			String descripcion
	);
}

