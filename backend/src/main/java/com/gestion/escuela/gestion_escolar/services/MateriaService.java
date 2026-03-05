package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Materia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MateriaService {

	void crearBatch(Long escuelaId, List<Materia> materias);

	void eliminar(Long escuelaId, Long materiaId);

	Materia crear(Long escuelaId, Materia materia);

	Materia obtenerPorId(Long id);

	Materia actualizar(
			Long escuelaId,
			Long materiaId,
			String nombre,
			String abreviatura,
			Integer cantidadModulos
	);

	Page<Materia> listarMateriasPorEscuela(Long escuelaId, Pageable pageable);

	List<Materia> listarMateriasPorEscuela(Long escuelaId);
}
