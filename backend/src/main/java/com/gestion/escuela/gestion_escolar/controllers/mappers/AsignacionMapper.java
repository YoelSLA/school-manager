package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionActivaRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionEmpleadoEducativoRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO.AsignacionLicenciaAdministrativaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO.AsignacionLicenciaCursoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.asignacionLicenciaDTO.AsignacionLicenciaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.response.BajaAsignacionDTO;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AsignacionMapper {

  public static AsignacionDetalleDTO toDetalle(Asignacion a, EstadoAsignacion estadoAsignacion) {
    return new AsignacionDetalleDTO(
        a.getId(),
        PeriodoMapper.toDTO(a.getPeriodo()),
        a.getSituacionDeRevista(),
        estadoAsignacion,
        toBaja(a),
        a.getSecuencia(),
        EmpleadoEducativoMapper.toBasico(a.getEmpleadoEducativo()));
  }

  public static AsignacionEmpleadoEducativoRowDTO toAsignacionRow(
      Asignacion a, EstadoAsignacion estadoAsignacion, EstadoDesignacion estadoDesignacion) {

    return new AsignacionEmpleadoEducativoRowDTO(
        a.getId(),
        PeriodoMapper.toDTO(a.getPeriodo()),
        a.getSituacionDeRevista(),
        estadoAsignacion,
        toBaja(a),
        a.getSecuencia(),
        DesignacionMapper.toDesignacionDTO(a.getDesignacion(), estadoDesignacion));
  }

  public static AsignacionLicenciaDTO toLicenciaItem(Asignacion asignacion) {

    Designacion d = asignacion.getDesignacion();

    if (d instanceof DesignacionAdministrativa adm) {
      return new AsignacionLicenciaAdministrativaDTO(
          asignacion.getId(),
          asignacion.getSecuencia(),
          adm.getCupof(),
          adm.getRolEducativo(),
          asignacion.getSituacionDeRevista(),
          PeriodoMapper.toDTO(asignacion.getPeriodo()));
    }

    if (d instanceof DesignacionCurso curso) {
      return new AsignacionLicenciaCursoDTO(
          asignacion.getId(),
          asignacion.getSecuencia(),
          curso.getCupof(),
          curso.getRolEducativo(),
          asignacion.getSituacionDeRevista(),
          PeriodoMapper.toDTO(asignacion.getPeriodo()),
          MateriaMapper.toResponse(curso.getMateria()),
          CursoMapper.toResponse(curso.getCurso()),
          curso.getOrientacion());
    }

    throw new IllegalStateException("Tipo de designación no soportado");
  }

  private static BajaAsignacionDTO toBaja(Asignacion a) {

    if (a.getFechaBaja() == null) {
      return null;
    }

    return new BajaAsignacionDTO(a.getFechaBaja(), a.getCausaBaja());
  }

  public static AsignacionActivaRowDTO toRow(Asignacion cargoActivo) {
    if (cargoActivo == null) {
      return null;
    }

    return new AsignacionActivaRowDTO(
            EmpleadoEducativoMapper.toBasico(cargoActivo.getEmpleadoEducativo()),
            cargoActivo.getSituacionDeRevista());
  }
}
