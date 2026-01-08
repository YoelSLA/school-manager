package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;

import java.util.List;

public interface EscuelaService {

	List<EmpleadoEducativo> listarEmpleadosEducativos(Long escuelaId);

	List<DesignacionAdministrativa> obtenerDesignacionesAdministrativas(Long escuelaId);

	List<DesignacionCurso> obtenerDesignacionesCursos(Long escuelaId);

	Escuela crear(Escuela escuela);

	List<Escuela> listarTodas();

	Escuela obtenerPorId(Long escuelaId);

}

