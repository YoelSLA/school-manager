package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;

import java.util.List;

public interface EscuelaService {

	void desactivarPorNombre(String nombre);

	void activarPorNombre(String nombre);

	List<EmpleadoEducativo> listarEmpleadosEducativos(Long escuelaId);

	List<Licencia> obtenerLicencias(Long escuelaId);

	List<DesignacionAdministrativa> obtenerDesignacionesAdministrativas(Long escuelaId);

	List<DesignacionCurso> obtenerDesignacionesCursos(Long escuelaId);

	Escuela crear(Escuela escuela);

	Escuela obtenerPorNombre(String nombre);

	Escuela actualizarPorNombre(String nombreActual, Escuela datosActualizados);

	List<Escuela> listarTodas();

	List<Escuela> listarActivas();

	Escuela obtenerPorId(Long escuelaId);

	Escuela guardar(Escuela escuela);


}

