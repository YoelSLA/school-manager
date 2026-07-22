package com.gestion.escuela.gestion_escolar.services.asistencia;

import com.gestion.escuela.gestion_escolar.models.Asistencia;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.EstadoAsistenciaDia;
import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.records.EmpleadoAsistenciaResumen;
import com.gestion.escuela.gestion_escolar.models.records.RolCantidad;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AsistenciaService {

  List<Asistencia> obtenerAsistenciasDelMes(Long escuelaId, Long empleadoId, YearMonth mes);

  List<EstadoAsistenciaDia> obtenerEstadoAsistenciaMensual(
      Long escuelaId, Long empleadoId, YearMonth mes);

  List<RolCantidad> contarEmpleadosPorRolVigente(Long escuelaId, LocalDate fecha);

  Page<EmpleadoEducativo> buscarEmpleados(
      Long escuelaId, LocalDate fecha, List<RolEducativo> roles, String query, Pageable pageable);

  void registrarInasistencia(
      Long escuelaId,
      Long empleadoId,
      LocalDate fecha,
      LicenciaEstatutaria licenciaEstatutaria,
      String observacion);

  void registrarInasistencias(
      Long escuelaId,
      EmpleadoEducativo empleado,
      List<LocalDate> fechas,
      LicenciaEstatutaria licenciaEstatutaria,
      String observacion);

  void eliminarInasistencia(Long escuelaId, Long empleadoId, LocalDate fecha);

  void eliminarInasistencias(Long escuelaId, Long empleadoId, List<LocalDate> fechas);

  EmpleadoAsistenciaResumen getResumenAsistenciaEmpleado(Long empleadoId, LocalDate fecha);
}
