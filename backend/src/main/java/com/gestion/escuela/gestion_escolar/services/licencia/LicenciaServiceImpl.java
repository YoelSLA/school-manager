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
import com.gestion.escuela.gestion_escolar.persistence.AsignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import com.gestion.escuela.gestion_escolar.persistence.LicenciaRepository;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

  public Licencia obtenerPorId(Long licenciaId) {
    return licenciaRepository
        .findById(licenciaId)
        .orElseThrow(() -> new RecursoNoEncontradoException("licencia", licenciaId));
  }

  @Override
  public Licencia crear(
      Long empleadoId,
      LicenciaEstatutaria licenciaEstatutaria,
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

    return licenciaRepository.buscarRaicesPorEscuelaId(escuelaId, pageable);
  }

  @Override
  public Licencia renovarLicencia(
      Long licenciaId,
      LicenciaEstatutaria licenciaEstatutaria,
      LocalDate nuevoHasta,
      String descripcion) {

    Licencia original = obtenerPorId(licenciaId);

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

  @Transactional
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
