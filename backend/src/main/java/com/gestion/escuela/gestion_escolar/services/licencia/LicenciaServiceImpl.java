package com.gestion.escuela.gestion_escolar.services.licencia;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.persistence.*;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LicenciaServiceImpl implements LicenciaService {

  private final LicenciaRepository licenciaRepository;
  private final EscuelaRepository escuelaRepository;
  private final AsignacionRepository asignacionRepository;
  private final EmpleadoEducativoRepository empleadoEducativoRepository;
  private final LicenciaEstatutariaRepository licenciaEstatutariaRepository;

  @Override
  public Licencia obtenerPorId(Long licenciaId) {
    return licenciaRepository
        .findById(licenciaId)
        .orElseThrow(() -> new RecursoNoEncontradoException("licencia", licenciaId));
  }

  @Override
  public Licencia crear(
      Long empleadoId,
      Long licenciaEstatutariaId,
      Periodo periodo,
      String descripcion,
      Set<Long> asignacionIds) {

    EmpleadoEducativo empleado =
        empleadoEducativoRepository
            .findById(empleadoId)
            .orElseThrow(() -> new RecursoNoEncontradoException("empleado", empleadoId));

    Set<Asignacion> asignaciones = new HashSet<>(asignacionRepository.findAllById(asignacionIds));

    if (asignaciones.size() != asignacionIds.size()) {
      throw new RecursoNoEncontradoException("Alguna asignación no existe", asignacionIds.size());
    }

    LicenciaEstatutaria licenciaEstatutaria =
        licenciaEstatutariaRepository
            .findById(licenciaEstatutariaId)
            .orElseThrow(
                () ->
                    new RecursoNoEncontradoException(
                        "licencia estatutaria", licenciaEstatutariaId));

    empleado.validarNuevaLicencia(licenciaEstatutaria, periodo, asignaciones);

    Licencia licencia =
        Licencia.builder()
            .empleadoEducativo(empleado)
            .licenciaEstatutaria(licenciaEstatutaria)
            .periodo(periodo)
            .descripcion(descripcion)
            .agregarAsignaciones(asignaciones)
            .build();

    empleado.agregarLicencia(licencia);

    return licenciaRepository.save(licencia);
  }

  @Override
  public Page<Licencia> buscarPorEscuela(Long escuelaId, Pageable pageable) {
    escuelaRepository
        .findById(escuelaId)
        .orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

    Page<Long> pageIds = licenciaRepository.buscarIdsRaicesPorEscuelaId(escuelaId, pageable);

    if (pageIds.isEmpty()) {
      return Page.empty(pageable);
    }

    List<Licencia> licencias = licenciaRepository.buscarPorIds(pageIds.getContent());

    return new PageImpl<>(licencias, pageable, pageIds.getTotalElements());
  }

  @Override
  public Licencia renovarLicencia(
      Long licenciaId, Long licenciaEstatutariaId, LocalDate nuevoHasta, String descripcion) {

    Licencia original = obtenerPorId(licenciaId);

    LicenciaEstatutaria licenciaEstatutaria =
        licenciaEstatutariaRepository
            .findById(licenciaEstatutariaId)
            .orElseThrow(() -> new RecursoNoEncontradoException("licencia", licenciaId));

    Licencia renovada = original.renovar(licenciaEstatutaria, nuevoHasta, descripcion);

    return licenciaRepository.save(renovada);
  }

  @Override
  public Set<Designacion> obtenerDesignacionesAfectadas(Long licenciaId) {

    Licencia licencia = obtenerPorId(licenciaId);

    return licencia.getAsignaciones().stream()
        .map(Asignacion::getDesignacion)
        .collect(Collectors.toSet());
  }

  @Override
  public List<Licencia> obtenerTimeline(Long licenciaId) {

    Licencia licencia = obtenerPorId(licenciaId);

    return licencia.cadenaCompleta();
  }

  @Override
  public void eliminarLicencia(Long licenciaId) {
    Licencia licencia =
        licenciaRepository
            .findById(licenciaId)
            .orElseThrow(() -> new RecursoNoEncontradoException("licencia", licenciaId));

    List<Long> designacionesIds =
        licencia.getAsignaciones().stream()
            .map(Asignacion::getDesignacion)
            .map(Designacion::getId)
            .distinct()
            .toList();

    asignacionRepository.eliminarSuplenciasDeLicencia(
        designacionesIds,
        licencia.getPeriodo().getFechaDesde(),
        licencia.getPeriodo().getFechaHasta());

    licencia.eliminarAsignaciones();

    licenciaRepository.delete(licencia);
  }

  @Override
  public Optional<Licencia> obtenerLicenciaActiva(Long empleadoId, LocalDate fecha) {
    EmpleadoEducativo empleado =
        empleadoEducativoRepository
            .findById(empleadoId)
            .orElseThrow(() -> new RecursoNoEncontradoException("empleado", empleadoId));
    return empleado.licenciaActivaEn(fecha);
  }

  @Override
  public EstadoLicencia obtenerEstadoEn(
      Licencia licencia, Map<Long, EstadoDesignacion> estadosDesignacion, LocalDate fecha) {
    if (!licencia.estaVigenteEn(fecha)) {
      return EstadoLicencia.NO_VIGENTE;
    }

    boolean cubierta =
        licencia.getAsignaciones().stream()
            .map(Asignacion::getDesignacion)
            .map(Designacion::getId)
            .distinct()
            .allMatch(id -> EstadoDesignacion.CUBIERTA.equals(estadosDesignacion.get(id)));

    return cubierta ? EstadoLicencia.CUBIERTA : EstadoLicencia.DESCUBIERTA;
  }
}
