package com.gestion.escuela.gestion_escolar.services.designacion;

import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface DesignacionCommandService {

  <T extends Designacion> T crear(T designacion);

  <T extends Designacion> void crearBatch(List<T> designaciones);

  AsignacionTitular cubrirConTitular(
      Long designacionId, Long empleadoId, LocalDate fechaTomaPosesion, Integer secuencia);

  AsignacionProvisional cubrirConProvisional(
      Long designacionId,
      Long empleadoId,
      LocalDate fechaInicio,
      LocalDate fechaFin,
      Integer secuencia);

  void cubrirConSuplentes(
      Long licenciaId,
      Long suplenteId,
      List<Long> designacionIds,
      LocalDate fechaInicio,
      Integer secuencia);

  void actualizarDesignacionCurso(
      Long designacionId,
      Integer cupof,
      Long cursoId,
      Long materiaId,
      String orientacion,
      Set<FranjaHoraria> franjasHorarias);

  void actualizarDesignacionAdministrativa(
      Long designacionId,
      Integer cupof,
      RolEducativo rolEducativo,
      Set<FranjaHoraria> franjaHorarias);

  Asignacion actualizarAsignacion(
      Long designacionId,
      Long asignacionId,
      Long empleadoId,
      LocalDate fechaTomaPosesion,
      LocalDate fechaCese,
      Integer secuencia);

  void cambiarCobertura(
      Long licenciaId,
      Long designacionId,
      Long nuevoEmpleadoId,
      LocalDate fechaTomaPosesion,
      Integer secuencia);

  AsignacionSuplente renovarCobertura(
      Long asignacionId, LocalDate nuevaFechaFin, Integer secuencia);

  void eliminarAsignacion(Long designacionId, Long asignacionId);
}
