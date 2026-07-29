package com.gestion.escuela.gestion_escolar.services.designacion;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionCursoFilterDTO;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.persistence.AsignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.DesignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DesignacionQueryServiceImpl implements DesignacionQueryService {

  private final DesignacionRepository designacionRepository;
  private final EscuelaRepository escuelaRepository;
  private final AsignacionRepository asignacionRepository;

  @Override
  public Designacion obtenerPorId(Long id) {
    return designacionRepository
        .findById(id)
        .orElseThrow(() -> new RecursoNoEncontradoException("designación", id));
  }

  @Override
  public List<Designacion> obtenerDesignaciones(List<Long> designacionIds) {
    return designacionRepository.findAllById(designacionIds);
  }

  @Override
  public Page<DesignacionCurso> obtenerDesignacionesCursoPorEscuela(
      Long escuelaId, DesignacionCursoFilterDTO filter, Pageable pageable) {

    if (!escuelaRepository.existsById(escuelaId)) {
      throw new RecursoNoEncontradoException("escuela", escuelaId);
    }

    return switch (filter.estado()) {
      case null ->
          designacionRepository.buscarCursosSinEstado(
              escuelaId, filter.cursoId(), filter.materiaId(), filter.orientacion(), pageable);

      case CUBIERTA ->
          designacionRepository.buscarCursosCubiertos(
              escuelaId,
              filter.cursoId(),
              filter.materiaId(),
              filter.orientacion(),
              LocalDate.now(),
              pageable);

      case VACANTE ->
          designacionRepository.buscarCursosVacantes(
              escuelaId,
              filter.cursoId(),
              filter.materiaId(),
              filter.orientacion(),
              LocalDate.now(),
              pageable);
    };
  }

  @Override
  public Page<DesignacionAdministrativa> obtenerDesignacionesAdministrativasPorEscuela(
      Long escuelaId, Pageable pageable) {

    if (!escuelaRepository.existsById(escuelaId)) {
      throw new RecursoNoEncontradoException("escuela", escuelaId);
    }

    return designacionRepository.findAdministrativasByEscuelaId(escuelaId, pageable);
  }

  @Override
  public Optional<Asignacion> obtenerCargoActivo(Long designacionId, LocalDate fecha) {
    return designacionRepository.findAsignacionQueEjerceEn(designacionId, fecha);
  }

  @Override
  public List<Asignacion> obtenerOtrosCargos(
          Long designacionId,
          EstadoAsignacion estado,
          LocalDate fecha) {

    return switch (estado) {
      case PENDIENTE -> asignacionRepository.findOtrosCargosPendientes(designacionId, fecha);
      case ACTIVA -> asignacionRepository.findOtrosCargosActivos(designacionId, fecha);
      case FINALIZADA -> asignacionRepository.findOtrosCargosFinalizados(designacionId, fecha);
      case BAJA -> asignacionRepository.findOtrosCargosBaja(designacionId, fecha);
      case null -> asignacionRepository.findOtrosCargos(designacionId, fecha);
    };
  }

  @Override
  public Map<Long, Asignacion> obtenerCargosActivos(
          Collection<Long> designacionIds,
          LocalDate fecha) {

    return designacionRepository
            .findAsignacionesQueEjercenEn(designacionIds, fecha)
            .stream()
            .collect(Collectors.toMap(
                    a -> a.getDesignacion().getId(),
                    Function.identity()
            ));
  }

  @Override
  public EstadoDesignacion obtenerEstadoEn(Long designacionId, LocalDate fecha) {
    boolean cubierta =
        designacionRepository.findAsignacionQueEjerceEn(designacionId, fecha).isPresent();

    return EstadoDesignacion.desdeCobertura(cubierta);
  }

  @Override
  public Map<Long, EstadoDesignacion> obtenerEstadosEn(Set<Long> designacionIds, LocalDate fecha) {

    Set<Long> cubiertas = designacionRepository.buscarDesignacionesCubiertas(designacionIds, fecha);

    return designacionIds.stream()
        .collect(
            Collectors.toMap(
                Function.identity(),
                id ->
                    cubiertas.contains(id)
                        ? EstadoDesignacion.CUBIERTA
                        : EstadoDesignacion.VACANTE));
  }

  @Override
  public Set<Long> obtenerDesignacionesCubiertas(
          Collection<Long> designacionIds,
          LocalDate fecha) {

    return new HashSet<>(designacionRepository.findDesignacionesCubiertas(designacionIds, fecha));
  }
}
