package com.gestion.escuela.gestion_escolar.services.licencia;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LicenciaService {

  Licencia obtenerPorId(Long licenciaId);

  Licencia crear(
      Long empleadoId,
      Long licenciaEstatutariaId,
      Periodo periodo,
      String descripcion,
      Set<Long> asignacionIds);

  Page<Licencia> buscarPorEscuela(Long escuelaId, Pageable pageable);

  Licencia renovarLicencia(
      Long licenciaId, Long licenciaEstatutariaId, LocalDate nuevoHasta, String descripcion);

  Set<Designacion> obtenerDesignacionesAfectadas(Long licenciaId);

  List<Licencia> obtenerTimeline(Long licenciaId);

  void eliminarLicencia(Long licenciaId);

  Optional<Licencia> obtenerLicenciaActiva(Long empleadoId, LocalDate fecha);

  EstadoLicencia obtenerEstadoEn(
      Licencia licencia, Map<Long, EstadoDesignacion> estadosDesignacion, LocalDate fecha);
}
