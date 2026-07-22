package com.gestion.escuela.gestion_escolar.models.domainServices;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ServicioEstadoLicencia {

  private final ServicioEstadoDesignacion estadoDesignacion;

  public ServicioEstadoLicencia(ServicioEstadoDesignacion estadoDesignacion) {
    this.estadoDesignacion = estadoDesignacion;
  }

  public EstadoLicencia getEstadoEn(Licencia licencia, LocalDate fecha) {

    if (!licencia.estaVigenteEn(fecha)) {
      return EstadoLicencia.NO_VIGENTE;
    }

    return estaCubiertaEn(licencia, fecha) ? EstadoLicencia.CUBIERTA : EstadoLicencia.DESCUBIERTA;
  }

  public boolean estaCubiertaEn(Licencia licencia, LocalDate fecha) {

    return designacionesAfectadas(licencia).stream()
        .allMatch(d -> estadoDesignacion.getEstadoEn(d, fecha) == EstadoDesignacion.CUBIERTA);
  }

  public Set<Designacion> designacionesAfectadas(Licencia licencia) {

    return licencia.getAsignaciones().stream()
        .map(Asignacion::getDesignacion)
        .collect(Collectors.toSet());
  }
}
