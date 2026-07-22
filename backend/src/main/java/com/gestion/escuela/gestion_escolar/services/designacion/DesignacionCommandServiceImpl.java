package com.gestion.escuela.gestion_escolar.services.designacion;

import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.domainServices.PoliticaDeCobertura;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.CoberturaNoEncontradaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.licencia.CoberturaNoPerteneceALicenciaException;
import com.gestion.escuela.gestion_escolar.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DesignacionCommandServiceImpl implements DesignacionCommandService {

  private final DesignacionRepository designacionRepository;
  private final EmpleadoEducativoRepository empleadoEducativoRepository;
  private final AsignacionRepository asignacionRepository;
  private final LicenciaRepository licenciaRepository;
  private final MateriaRepository materiaRepository;
  private final CursoRepository cursoRepository;

  @Override
  public <T extends Designacion> T crear(T designacion) {

    Validaciones.noNulo(designacion, "designacion");

    Escuela escuela = designacion.getEscuela();
    Integer cupof = designacion.getCupof();

    this.validarCupofUnico(escuela.getId(), cupof, null);

    return designacionRepository.save(designacion);
  }

  @Override
  public <T extends Designacion> void crearBatch(List<T> designaciones) {

    Validaciones.noVacio(designaciones, "designacion");

    Escuela escuela = designaciones.getFirst().getEscuela();
    Long escuelaId = escuela.getId();
    String nombreEscuela = escuela.getNombre();

    /* ======================
       CUPOfs DEL BATCH
    ====================== */

    Set<Integer> cupofsBatch = new HashSet<>();

    for (Designacion d : designaciones) {
      Integer cupof = d.getCupof();

      if (!cupofsBatch.add(cupof)) {
        throw new RecursoDuplicadoException(
            String.format("Ya existe una designación con cupof %s en %s", cupof, nombreEscuela));
      }
    }

    /* ======================
       VALIDAR CONTRA DB
    ====================== */

    List<Designacion> existentes =
        designacionRepository.findByEscuelaIdAndCupofIn(escuelaId, cupofsBatch);

    if (!existentes.isEmpty()) {

      Integer cupofDuplicado = existentes.getFirst().getCupof();

      throw new RecursoDuplicadoException(
          String.format(
              "Ya existe una designación con cupof %s en %s", cupofDuplicado, nombreEscuela));
    }

    /* ======================
       GUARDAR
    ====================== */

    designacionRepository.saveAll(designaciones);
  }

  @Override
  public AsignacionTitular cubrirConTitular(
      Long designacionId, Long empleadoId, LocalDate fechaTomaPosesion, Integer secuencia) {

    Designacion designacion =
        designacionRepository
            .findById(designacionId)
            .orElseThrow(() -> new RecursoNoEncontradoException("designación", designacionId));

    EmpleadoEducativo empleado =
        empleadoEducativoRepository
            .findById(empleadoId)
            .orElseThrow(
                () ->
                    new RecursoNoEncontradoException(
                        "empleadoEducativoBasico educativo", empleadoId));

    boolean tieneTitularVigente =
        asignacionRepository.existeAsignacionActiva(
            designacionId, AsignacionTitular.class, fechaTomaPosesion);

    PoliticaDeCobertura.validarCubrirConTitular(
        designacion, empleado, fechaTomaPosesion, tieneTitularVigente);

    AsignacionTitular titular =
        designacion.registrarTitular(empleado, fechaTomaPosesion, secuencia);

    return asignacionRepository.save(titular);
  }

  @Override
  public AsignacionProvisional cubrirConProvisional(
      Long designacionId,
      Long empleadoId,
      LocalDate fechaDesde,
      LocalDate fechaHasta,
      Integer secuencia) {

    Designacion designacion =
        designacionRepository
            .findById(designacionId)
            .orElseThrow(() -> new RecursoNoEncontradoException("designación", designacionId));

    EmpleadoEducativo empleado =
        empleadoEducativoRepository
            .findById(empleadoId)
            .orElseThrow(
                () ->
                    new RecursoNoEncontradoException(
                        "empleadoEducativoBasico educativo", empleadoId));

    if (fechaHasta != null && fechaHasta.isBefore(fechaDesde)) {
      throw new IllegalArgumentException("La fecha fin no puede ser anterior a la fecha inicio");
    }

    Periodo periodoCerrado = Periodo.cerrado(fechaDesde, fechaHasta);

    AsignacionProvisional asignacion =
        designacion.cubrirConProvisionalManual(empleado, periodoCerrado, secuencia);

    designacionRepository.save(designacion);

    return asignacion;
  }

  @Override
  public void cubrirConSuplentes(
      Long licenciaId,
      Long suplenteId,
      List<Long> designacionIds,
      LocalDate fechaTomaPosesion,
      Integer secuencia) {

    Validaciones.noNulo(fechaTomaPosesion, "fecha toma posesión");
    Validaciones.noVacio(designacionIds, "designacionIds");

    Licencia licencia =
        licenciaRepository
            .findById(licenciaId)
            .orElseThrow(() -> new RecursoNoEncontradoException("licencia", licenciaId));

    EmpleadoEducativo suplente =
        empleadoEducativoRepository
            .findById(suplenteId)
            .orElseThrow(
                () ->
                    new RecursoNoEncontradoException(
                        "empleadoEducativoBasico educativo", suplenteId));

    List<Designacion> designaciones = designacionRepository.findAllById(designacionIds);

    PoliticaDeCobertura.validarCubrirConSuplente(licencia, suplente, fechaTomaPosesion);

    for (Designacion designacion : designaciones) {

      asignacionRepository
          .buscarAsignacionAfectada(licenciaId, designacion.getId())
          .orElseThrow(() -> new CoberturaNoPerteneceALicenciaException(licencia, designacion));

      designacion.registrarSuplente(licencia, suplente, fechaTomaPosesion, secuencia);
    }
  }

  @Override
  public void actualizarDesignacionCurso(
      Long designacionId,
      Integer cupof,
      Long materiaId,
      Long cursoId,
      String orientacion,
      Set<FranjaHoraria> franjasHorarias) {

    DesignacionCurso designacionCurso =
        designacionRepository
            .findCursoById(designacionId)
            .orElseThrow(
                () -> new RecursoNoEncontradoException("Designación curso", designacionId));

    Materia materia =
        materiaRepository
            .findById(materiaId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Materia", materiaId));

    Curso curso =
        cursoRepository
            .findById(cursoId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Curso", cursoId));

    validarCupofUnico(designacionCurso.getEscuela().getId(), cupof, designacionCurso.getId());

    designacionCurso.setCupof(cupof);
    designacionCurso.setMateria(materia);
    designacionCurso.setCurso(curso);
    designacionCurso.setOrientacion(orientacion);
    designacionCurso.setFranjasHorarias(franjasHorarias);
  }

  @Override
  public void actualizarDesignacionAdministrativa(
      Long designacionId,
      Integer cupof,
      RolEducativo rolEducativo,
      Set<FranjaHoraria> franjasHorarias) {

    DesignacionAdministrativa designacion =
        designacionRepository
            .findAdministrativaById(designacionId)
            .orElseThrow(
                () ->
                    new RecursoNoEncontradoException("Designación administrativa", designacionId));

    validarCupofUnico(designacion.getEscuela().getId(), cupof, designacion.getId());

    designacion.setCupof(cupof);
    designacion.setRolEducativo(rolEducativo);
    designacion.setFranjasHorarias(franjasHorarias);
  }

  @Override
  public Asignacion actualizarAsignacion(
      Long designacionId,
      Long asignacionId,
      Long empleadoId,
      LocalDate fechaTomaPosesion,
      LocalDate fechaCese,
      Integer secuencia) {

    EmpleadoEducativo empleado =
        empleadoEducativoRepository
            .findById(empleadoId)
            .orElseThrow(
                () ->
                    new RecursoNoEncontradoException(
                        "empleadoEducativoBasico educativo", empleadoId));

    designacionRepository
        .findById(designacionId)
        .orElseThrow(() -> new RecursoNoEncontradoException("designación", designacionId));

    Asignacion asignacion =
        asignacionRepository
            .findByIdAndDesignacionId(asignacionId, designacionId)
            .orElseThrow(() -> new RecursoNoEncontradoException("asignacion", asignacionId));

    asignacion.actualizar(empleado, fechaTomaPosesion, fechaCese, secuencia);

    return asignacionRepository.save(asignacion);
  }

  @Override
  public void cambiarCobertura(
      Long licenciaId,
      Long designacionId,
      Long nuevoEmpleadoId,
      LocalDate fechaTomaPosesion,
      Integer secuencia) {

    Designacion designacion =
        designacionRepository
            .findById(designacionId)
            .orElseThrow(() -> new RecursoNoEncontradoException("designacion", designacionId));

    EmpleadoEducativo nuevoSuplente =
        empleadoEducativoRepository
            .findById(nuevoEmpleadoId)
            .orElseThrow(
                () -> new RecursoNoEncontradoException("empleadoEducativoBasico", nuevoEmpleadoId));

    AsignacionSuplente suplencia =
        asignacionRepository
            .buscarSuplencia(designacionId, licenciaId)
            .orElseThrow(() -> new CoberturaNoEncontradaException(designacion));

    suplencia.actualizar(nuevoSuplente, fechaTomaPosesion, secuencia);
  }

  @Override
  public AsignacionSuplente renovarCobertura(
      Long asignacionId, LocalDate nuevaFechaFin, Integer secuencia) {

    Asignacion actual =
        asignacionRepository
            .findById(asignacionId)
            .orElseThrow(() -> new RecursoNoEncontradoException("asignacion", asignacionId));

    if (!actual.estaActivaEn(LocalDate.now())) {
      throw new IllegalStateException("Solo se puede renovar una asignación activa");
    }

    LocalDate nuevaFechaInicio = actual.getPeriodo().getFechaHasta().plusDays(1);

    if (!nuevaFechaFin.isAfter(nuevaFechaInicio.minusDays(1))) {
      throw new RangoFechasInvalidoException(nuevaFechaInicio, nuevaFechaInicio);
    }

    // 1️ Cerrar actual
    // actual.finalizar();

    // actual.getDesignacion().agregarAsignacion(nueva);

    return AsignacionSuplente.builder()
        .empleadoEducativo(actual.getEmpleadoEducativo())
        .designacion(actual.getDesignacion())
        .secuencia(secuencia)
        .periodo(Periodo.cerrado(nuevaFechaInicio, nuevaFechaFin))
        .build();
  }

  @Override
  public void eliminarAsignacion(Long designacionId, Long asignacionId) {}

  private void validarCupofUnico(Long escuelaId, Integer cupof, Long designacionId) {

    boolean existe =
        designacionId == null
            ? designacionRepository.existsByEscuelaIdAndCupof(escuelaId, cupof)
            : designacionRepository.existsByEscuelaIdAndCupofAndIdNot(
                escuelaId, cupof, designacionId);

    if (existe) {
      throw new RecursoDuplicadoException(
          String.format(
              "Ya existe una designación con cupof %s en la escuela %s", cupof, escuelaId));
    }
  }
}
