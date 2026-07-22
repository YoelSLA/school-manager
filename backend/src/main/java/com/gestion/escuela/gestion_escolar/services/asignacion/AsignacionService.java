package com.gestion.escuela.gestion_escolar.services.asignacion;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import java.time.LocalDate;
import java.util.List;

public interface AsignacionService {

  long contarActivas(Long empleadoId, LocalDate fecha);

  List<Asignacion> obtenerPorEmpleado(Long empleadoId);
}
