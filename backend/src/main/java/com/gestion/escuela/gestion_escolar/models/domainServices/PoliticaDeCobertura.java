package com.gestion.escuela.gestion_escolar.models.domainServices;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaCubiertaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaTieneTitularException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoEnLicenciaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoInactivoException;
import java.time.LocalDate;

public class PoliticaDeCobertura {

  private PoliticaDeCobertura() {}

  public static void validarCubrirConTitular(
      Designacion designacion,
      EmpleadoEducativo empleado,
      LocalDate fechaDesde,
      boolean existeTitularVigente) {

    Validaciones.noNulo(empleado, "empleadoEducativoBasico");
    Validaciones.noNulo(fechaDesde, "fecha desde");
    validarPuedeTomarPosesionEn(empleado, fechaDesde);

    if (existeTitularVigente) {
      throw new DesignacionYaTieneTitularException(designacion);
    }
  }

  public static void validarCubrirConProvisionalAutomatico(
      Designacion designacion,
      EmpleadoEducativo empleadoEducativo,
      LocalDate fechaInicio,
      Periodo periodo) {

    Validaciones.noNulo(empleadoEducativo, "empleadoEducativoBasico educativo");
    Validaciones.noNulo(fechaInicio, "fecha inicio");
    validarCubrirConProvisional(designacion, empleadoEducativo, periodo);
    validarPuedeTomarPosesionEn(empleadoEducativo, periodo.getFechaDesde());
  }

  public static void validarCubrirConProvisionalManual(
      Designacion designacion, EmpleadoEducativo empleadoEducativo, Periodo periodo) {

    Validaciones.noNulo(empleadoEducativo, "empleadoEducativoBasico educativo");
    Validaciones.noNulo(periodo, "periodo");
    Validaciones.noNulo(periodo.getFechaDesde(), "fecha desde");
    Validaciones.noNulo(periodo.getFechaHasta(), "fecha hasta");
    validarCubrirConProvisional(designacion, empleadoEducativo, periodo);
  }

  public static void validarCubrirConSuplente(
      Licencia licencia, EmpleadoEducativo suplente, LocalDate fechaInicio) {
    Validaciones.noNulo(licencia, "licencia");
    Validaciones.noNulo(suplente, "empleado educativo");
    Validaciones.noNulo(fechaInicio, "fecha inicio");

    validarPuedeTomarPosesionEn(suplente, fechaInicio);

    if (fechaInicio.isBefore(licencia.getPeriodo().getFechaDesde())) {
      throw new RangoFechasInvalidoException(licencia.getPeriodo().getFechaDesde(), fechaInicio);
    }
  }

  private static void validarPuedeTomarPosesionEn(
      EmpleadoEducativo empleadoEducativo, LocalDate fecha) {
    if (fecha == null) {
      throw new CampoObligatorioException("fecha de toma de posesión");
    }

    if (!empleadoEducativo.isActivo()) {
      throw new EmpleadoInactivoException(empleadoEducativo);
    }

    if (empleadoEducativo.licenciaActivaEn(fecha).isPresent()) {
      throw new EmpleadoEnLicenciaException(empleadoEducativo.getId(), fecha);
    }
  }

  private static void validarCubrirConProvisional(
      Designacion designacion, EmpleadoEducativo empleado, Periodo periodo) {

    Validaciones.noNulo(empleado, "empleadoEducativoBasico educativo");
    Validaciones.noNulo(periodo, "periodo");

    if (designacion.tieneAsignacionQueSeSuperponeCon(periodo)) {
      throw new DesignacionYaCubiertaException(designacion);
    }
  }
}
