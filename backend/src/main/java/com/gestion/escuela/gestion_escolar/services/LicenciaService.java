package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface LicenciaService {

	Licencia obtenerPorId(Long id);

	Page<Licencia> buscarPorEscuela(
			Long escuelaId,
			Pageable pageable
	);

	Licencia renovarLicencia(
			Long licenciaId,
			TipoLicencia nuevoTipo,
			LocalDate nuevoHasta,
			String descripcion
	);

	Set<Designacion> obtenerDesignacionesAfectadas(Long licenciaId);

	List<Licencia> obtenerTimeline(Long licenciaId);
}

