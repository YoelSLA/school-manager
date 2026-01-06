package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

import java.time.LocalDate;

public interface DesignacionService {

	DesignacionAdministrativa crearAdministrativa(DesignacionAdministrativa designacionAdministrativa);

	DesignacionCurso crearCurso(DesignacionCurso designacionCurso);


	Licencia crearLicencia(Designacion designacion, LocalDate fechaDesde, LocalDate fechaHasta, TipoLicencia tipoLicencia, String descripcion);

	void cubrirLicencia(Designacion designacion, Licencia licencia, EmpleadoEducativo empleadoSuplente);

	Designacion obtenerPorId(Long id);

	Licencia obtenerLicenciaPorId(Long licenciaId);


	DesignacionAdministrativa obtenerAdministrativaPorEscuela(Long escuelaId,
															  Long designacionId);
}

