package com.gestion.escuela.gestion_escolar.models.domainServices;

import static com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista.TITULAR;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

@Service
public class ServicioEstadoDesignacion {

  private final Map<String, EstadoDesignacion> cacheEstados = new ConcurrentHashMap<>();

  public Optional<Asignacion> asignacionQueEjerceEn(Designacion designacion, LocalDate fecha) {

    if (fecha == null) {
      return Optional.empty();
    }

    return designacion.getAsignaciones().stream()
        .filter(a -> a.estaActivaEn(fecha))
        .filter(a -> !a.getEmpleadoEducativo().tieneLicenciaEn(fecha))
        .findFirst();
  }

  public Optional<Asignacion> asignacionQueEjerceEn(Designacion designacion, Periodo periodo) {

    return designacion.getAsignaciones().stream()
        .filter(a -> a.seSuperponeCon(periodo))
        .filter(a -> !a.getEmpleadoEducativo().tieneLicenciaSuperpuestaEn(periodo))
        .findFirst();
  }

  public Optional<EmpleadoEducativo> getEmpleadoActivoEn(Designacion designacion, LocalDate fecha) {

    return asignacionQueEjerceEn(designacion, fecha).map(Asignacion::getEmpleadoEducativo);
  }

  public boolean tieneTitularActivo(Designacion designacion, LocalDate fecha) {
    return asignacionQueEjerceEn(designacion, fecha)
        .filter(a -> a.getSituacionDeRevista() == TITULAR)
        .isPresent();
  }

  public boolean tieneVacantePorLicenciaEn(Designacion designacion, LocalDate fecha) {
    return designacion.getAsignaciones().stream()
        .anyMatch(a -> a.getEmpleadoEducativo().estaEnLicenciaPara(a, fecha));
  }

  public EstadoDesignacion getEstadoEn(Designacion designacion, LocalDate fecha) {

    String key = designacion.getId() + "-" + fecha;

    return cacheEstados.computeIfAbsent(
        key, k -> EstadoDesignacion.desdeCobertura(estaCubiertaEn(designacion, fecha)));
  }

  public EstadoDesignacion getEstadoEn(Designacion designacion, Periodo periodo) {

    return EstadoDesignacion.desdeCobertura(
        asignacionQueEjerceEn(designacion, periodo).isPresent());
  }

  public boolean estaCubiertaEn(Designacion designacion, LocalDate fecha) {
    return asignacionQueEjerceEn(designacion, fecha).isPresent();
  }
}
