package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoCaracteristicaAsignacion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
			LocalDate fechaInicio
	);

	void cubrirConSuplentes(
			Long licenciaId,
			Long suplenteId,
			List<Long> designacionIds,
			LocalDate fechaInicio
	);
	
	<T extends Designacion> Page<T> obtenerDesignacionesPorEscuela(
			Long escuelaId,
			Class<T> tipo,
			Pageable pageable
	);

	Optional<Asignacion> obtenerCargoActivo(Long designacionId, LocalDate referencia);

	List<Asignacion> obtenerOtrosCargos(
			Long designacionId,
			EstadoAsignacion estado,
			LocalDate fecha
	);
}

