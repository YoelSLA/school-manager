package com.gestion.escuela.gestion_escolar.services.empleadoEducativo;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmpleadoEducativoService {

  EmpleadoEducativo crear(Long escuelaId, EmpleadoEducativo empleado);

  void crearBatch(List<EmpleadoEducativo> empleadoEducativos);

  EmpleadoEducativo obtenerPorId(Long empleadoId);

  void darDeBajaDefinitiva(Long empleadoId, LocalDate fechaBaja, CausaBaja causa);

  EmpleadoEducativo obtenerPorEscuela(Long escuelaId, Long empleadoId);

  Page<EmpleadoEducativo> listarPorEscuela(Long escuelaId, Boolean estado, Pageable pageable);

  List<EmpleadoEducativo> buscarPorEscuela(Long escuelaId, String search);

  Set<RolEducativo> obtenerRolesEducativos(Long empleadoId);

  Set<LocalDate> diasLaborablesEnPeriodo(Long escuelaId, Long empleadoId, Periodo periodo);

  EmpleadoEducativo actualizar(EmpleadoEducativo empleado);

  Set<Asignacion> obtenerAsignacionesActivas(Long empleadoId);
}
