package com.gestion.escuela.gestion_escolar.services.materia;

import com.gestion.escuela.gestion_escolar.models.Materia;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MateriaService {

  void crearBatch(Long escuelaId, List<Materia> materias);

  void eliminar(Long escuelaId, Long materiaId);

  Materia crear(Long escuelaId, Materia materia);

  Materia obtenerPorId(Long materiaId);

  Materia actualizar(
      Long escuelaId, Long materiaId, String nombre, String abreviatura, Integer cantidadModulos);

  Page<Materia> listarMateriasPorEscuela(Long escuelaId, Pageable pageable);

  List<Materia> listarMateriasPorEscuela(Long escuelaId);
}
