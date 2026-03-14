package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionCursoFilterDTO;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
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

	Asignacion cubrirConTitular(
			Long designacionId,
			Long empleadoId,
			LocalDate fechaTomaPosesion,
			TipoCaracteristicaAsignacion caracteristica
	);

	AsignacionProvisional cubrirConProvisional(
			Long designacionId,
			Long empleadoId,
			LocalDate fechaInicio,
			LocalDate fechaFin
	);

	void cubrirConSuplentes(
			Long licenciaId,
			Long suplenteId,
			List<Long> designacionIds,
			LocalDate fechaInicio
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

	Optional<Asignacion> obtenerCargoActivo(Long designacionId, LocalDate referencia);

	List<Asignacion> obtenerOtrosCargos(
			Long designacionId,
			EstadoAsignacion estado,
			LocalDate fecha
	);

	void actualizarDesignacionCurso(Long designacionId, Integer cupof, Long cursoId, Long materiaId, String orientacion, Set<FranjaHoraria> franjasHorarias);

	void actualizarDesignacionAdministrativa(Long designacionId, Integer cupof, RolEducativo rolEducativo, Set<FranjaHoraria> franjaHorarias);

	Asignacion editarAsignacion(Long designacionId, Long asignacionId, Long aLong, LocalDate localDate, LocalDate localDate1);
}

