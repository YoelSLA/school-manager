package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.models.Materia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MateriaService {

	Materia crear(Long escuelaId, Materia materia);

	void crearBatch(Long escuelaId, List<Materia> materias);

	Materia obtenerPorId(Long id);

	Page<Materia> listarMateriasPorEscuela(Long escuelaId, Pageable pageable);

	List<Materia> listarMateriasPorEscuela(Long escuelaId);

	void eliminar(Long escuelaId, Long materiaId);

	Materia actualizar(
			Long escuelaId,
			Long materiaId,
			String nombre,
			String abreviatura,
			Integer cantidadModulos
	);
}
