package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.response.DesignacionCursoFilterDTO;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoCaracteristicaAsignacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface DesignacionService {

	<T extends Designacion> T crear(T designacion);

	<T extends Designacion> void crearBatch(List<T> designaciones);

	Designacion obtenerPorId(Long id);

	List<Designacion> obtenerDesignaciones(List<Long> designacionIds);

	AsignacionTitular cubrirConTitular(
			Long designacionId,
			Long empleadoId,
			LocalDate fechaTomaPosesion,
			TipoCaracteristicaAsignacion caracteristica,
			Integer secuencia
	);

	AsignacionProvisional cubrirConProvisional(
			Long designacionId,
			Long empleadoId,
			LocalDate fechaInicio,
			LocalDate fechaFin,
			Integer secuencia
	);

	void cubrirConSuplentes(
			Long licenciaId,
			Long suplenteId,
			List<Long> designacionIds,
			LocalDate fechaInicio,
			Integer secuencia
	);

	Page<DesignacionCurso> obtenerDesignacionesCursoPorEscuela(
			Long escuelaId,
			DesignacionCursoFilterDTO filter,
			Pageable pageable
	);

	Page<DesignacionAdministrativa> obtenerDesignacionesAdministrativasPorEscuela(
			Long escuelaId,
			Pageable pageable
	);

	Optional<Asignacion> obtenerCargoActivo(Long designacionId);

	List<Asignacion> obtenerOtrosCargos(
			Long designacionId,
			EstadoAsignacion estado,
			LocalDate fecha
	);

	void actualizarDesignacionCurso(
			Long designacionId,
			Integer cupof,
			Long cursoId,
			Long materiaId,
			String orientacion,
			Set<FranjaHoraria> franjasHorarias
	);

	void actualizarDesignacionAdministrativa(
			Long designacionId,
			Integer cupof,
			RolEducativo rolEducativo,
			Set<FranjaHoraria> franjaHorarias
	);

	Asignacion actualizarAsignacion(
			Long designacionId,
			Long asignacionId,
			Long empleadoId,
			LocalDate fechaTomaPosesion,
			LocalDate fechaCese,
			Integer secuencia);

	void cambiarCobertura(
			Long licenciaId,
			Long designacionId,
			Long nuevoEmpleadoId,
			LocalDate fechaTomaPosesion,
			Integer secuencia
	);

	void eliminarAsignacion(Long designacionId, Long asignacionId);
}

