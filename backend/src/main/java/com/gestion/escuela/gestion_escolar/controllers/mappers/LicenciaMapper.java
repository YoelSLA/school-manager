package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.*;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoCerradoDTO;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoPeriodoLicencia;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class LicenciaMapper {

  /* =========================
  RESUMEN / CARD
  ========================= */

  public static LicenciaResumenDTO toResumen(Licencia l, EstadoLicencia estado, LocalDate fecha) {
    return new LicenciaResumenDTO(
        l.getId(),
        EmpleadoEducativoMapper.toBasico(l.getEmpleadoEducativo()),
        LicenciaEstatutariaMapper.toResponseDTO(l.getLicenciaEstatutaria()),
        (PeriodoCerradoDTO) PeriodoMapper.toDTO(l.getPeriodo()),
        estado,
        l.diasRestantes(fecha));
  }

  public static LicenciaRowDTO toRow(Licencia l, EstadoLicencia estado, LocalDate fecha) {
    return new LicenciaRowDTO(
        l.getId(),
        EmpleadoEducativoMapper.toBasico(l.getEmpleadoEducativo()),
        LicenciaEstatutariaMapper.toResponseDTO(l.getLicenciaEstatutaria()),
        (PeriodoCerradoDTO) PeriodoMapper.toDTO(l.getPeriodo()),
        estado,
        l.diasRestantes(fecha));
  }

  /* =========================
  DETALLE
  ========================= */

  public static LicenciaDetalleDTO toDetalle(Licencia l, EstadoLicencia estado) {
    return new LicenciaDetalleDTO(
        l.getId(),
        EmpleadoEducativoMapper.toBasico(l.getEmpleadoEducativo()),
        LicenciaEstatutariaMapper.toResponseDTO(l.getLicenciaEstatutaria()),
        l.getDescripcion(),
        PeriodoMapper.toCerradoDTO(l.getPeriodo()),
        estado);
  }

  public static LicenciaDesignacionDTO toDesignacionDTO(
          Designacion d, Asignacion asignacionQueEjerce) {

    EstadoDesignacion estado =
            asignacionQueEjerce != null
                    ? EstadoDesignacion.CUBIERTA
                    : EstadoDesignacion.VACANTE;

    AsignacionDetalleDTO asignacionActiva =
            asignacionQueEjerce != null
                    ? AsignacionMapper.toDetalle(
                    asignacionQueEjerce,
                    asignacionQueEjerce.getEstadoEn(LocalDate.now()))
                    : null;

    if (d instanceof DesignacionAdministrativa da) {
      return new LicenciaDesignacionAdministrativaDTO(
              da.getId(),
              da.getCupof(),
              estado,
              da.getRolEducativo(),
              asignacionActiva);
    }

    if (d instanceof DesignacionCurso dc) {
      return new LicenciaDesignacionCursoDTO(
              dc.getId(),
              dc.getCupof(),
              estado,
              dc.getRolEducativo(),
              dc.getMateria().getNombre(),
              dc.getCurso().anioDivision(),
              dc.getOrientacion(),
              asignacionActiva);
    }

    throw new IllegalStateException(
            "Tipo de designación no soportado: " + d.getClass().getSimpleName());
  }

  public static LicenciaTimelineItemDTO toTimelineItem(Licencia l) {
    return new LicenciaTimelineItemDTO(
        l.getId(),
        l.getLicenciaAnterior() == null
            ? TipoPeriodoLicencia.ORIGINAL
            : TipoPeriodoLicencia.RENOVACION,
        PeriodoMapper.toCerradoDTO(l.getPeriodo()));
  }

  public static LicenciaEmpleadoEducativoRowDTO toLicenciaRow(Licencia l, EstadoLicencia estado) {

    return new LicenciaEmpleadoEducativoRowDTO(
        l.getId(),
        PeriodoMapper.toCerradoDTO(l.getPeriodo()),
        LicenciaEstatutariaMapper.toResponseDTO(l.getLicenciaEstatutaria()),
        estado,
        l.getDescripcion());
  }
}
