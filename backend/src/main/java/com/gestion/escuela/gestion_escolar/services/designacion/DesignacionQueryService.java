package com.gestion.escuela.gestion_escolar.services.designacion;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionCursoFilterDTO;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DesignacionQueryService {

  Designacion obtenerPorId(Long id);

  List<Designacion> obtenerDesignaciones(List<Long> designacionIds);

  Page<DesignacionCurso> obtenerDesignacionesCursoPorEscuela(
      Long escuelaId, DesignacionCursoFilterDTO filter, Pageable pageable);

  Page<DesignacionAdministrativa> obtenerDesignacionesAdministrativasPorEscuela(
      Long escuelaId, Pageable pageable);

  Optional<Asignacion> obtenerCargoActivo(Long designacionId, LocalDate fecha);

  List<Asignacion> obtenerOtrosCargos(Long designacionId, EstadoAsignacion estado, LocalDate fecha);

  EstadoDesignacion obtenerEstadoEn(Long designacionId, LocalDate fecha);

  Map<Long, EstadoDesignacion> obtenerEstadosEn(Set<Long> designacionIds, LocalDate fecha);
}
