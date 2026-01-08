package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;

import java.time.LocalDate;

public interface DesignacionService {

	DesignacionAdministrativa crearAdministrativa(DesignacionAdministrativa designacionAdministrativa);

	DesignacionCurso crearCurso(DesignacionCurso designacionCurso);

	void cubrirDesignacion(
			Long designacionId,
			Long empleadoId,
			LocalDate fechaDesde,
			LocalDate fechaHasta
	);

	Designacion obtenerPorId(Long id);

	Licencia obtenerLicenciaPorId(Long licenciaId);


	DesignacionAdministrativa obtenerAdministrativaPorEscuela(Long escuelaId,
															  Long designacionId);

}

