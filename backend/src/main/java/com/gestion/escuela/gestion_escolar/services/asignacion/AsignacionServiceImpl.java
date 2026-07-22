package com.gestion.escuela.gestion_escolar.services.asignacion;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.persistence.AsignacionRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class AsignacionServiceImpl implements AsignacionService {

  private final AsignacionRepository asignacionRepository;

  @Override
  public long contarActivas(Long empleadoId, LocalDate fecha) {
    return asignacionRepository.contarActivas(empleadoId, fecha);
  }

  @Override
  public List<Asignacion> obtenerPorEmpleado(Long empleadoId) {
    return asignacionRepository.findByEmpleadoEducativoId(empleadoId);
  }
}
