package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionAdministrativaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.request.DesignacionCursoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionAdministrativaRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.DesignacionCursoRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionAsignacionDTO.DesignacionAdministrativaAsignacionDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionAsignacionDTO.DesignacionAsignacionDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionAsignacionDTO.DesignacionCursoAsignacionDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionDetalleDTO.DesignacionAdministrativaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionDetalleDTO.DesignacionCursoDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionDetalleDTO.DesignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionLicenciaItemDTO.DesignacionLicenciaAdministrativaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionLicenciaItemDTO.DesignacionLicenciaCursoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionLicenciaItemDTO.DesignacionLicenciaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.franjaHoraria.response.FranjaHorariaMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DesignacionMapper {

  private static final LocalDate HOY = LocalDate.now();

  // ---------------------------
  // Public mapping entry points
  // ---------------------------

  public static DesignacionDetalleDTO toDetalle(
      Designacion d, EstadoDesignacion estadoDesignacion) {
    if (d instanceof DesignacionAdministrativa da) {
      return toDetalle(da, estadoDesignacion);
    }

    if (d instanceof DesignacionCurso dc) {
      return toDetalle(dc, estadoDesignacion);
    }

    throw new IllegalStateException();
  }

  public static DesignacionAdministrativaDetalleDTO toDetalle(
      DesignacionAdministrativa d, EstadoDesignacion estadoDesignacion) {
    return new DesignacionAdministrativaDetalleDTO(
        d.getId(),
        d.getCupof(),
        estadoDesignacion,
        d.getRolEducativo(),
        asignaciones(d),
        franjas(d));
  }

  public static DesignacionCursoDetalleDTO toDetalle(
      DesignacionCurso d, EstadoDesignacion estadoDesignacion) {
    return new DesignacionCursoDetalleDTO(
        d.getId(),
        d.getCupof(),
        estadoDesignacion,
        d.getRolEducativo(),
        asignaciones(d),
        franjas(d),
        CursoMapper.toResponse(d.getCurso()),
        MateriaMapper.toResponse(d.getMateria()),
        d.getOrientacion());
  }

  public static DesignacionLicenciaDTO toLicenciaItem(Designacion d) {
    if (d instanceof DesignacionAdministrativa adm) {
      return new DesignacionLicenciaAdministrativaDTO(
          adm.getId(), adm.getCupof(), adm.getRolEducativo().name());
    }

    if (d instanceof DesignacionCurso curso) {
      return new DesignacionLicenciaCursoDTO(
          curso.getId(),
          curso.getCupof(),
          curso.getRolEducativo().name(),
          MateriaMapper.toResponse(curso.getMateria()),
          CursoMapper.toResponse(curso.getCurso()),
          curso.getOrientacion());
    }

    throw new IllegalStateException("Tipo de designación no soportado");
  }

  public static DesignacionAdministrativaRowDTO toRow(
          DesignacionAdministrativa d,
          EstadoDesignacion estadoDesignacion,
          Asignacion cargoActivo) {

    return new DesignacionAdministrativaRowDTO(
            d.getId(),
            d.getCupof(),
            d.cantidadFranjasHorarias(),
            estadoDesignacion,
            d.getRolEducativo(),
            AsignacionMapper.toRow(cargoActivo));

  }

  public static DesignacionCursoRowDTO toRow(
          DesignacionCurso d,
          EstadoDesignacion estadoDesignacion,
          Asignacion cargoActivo) {

    return new DesignacionCursoRowDTO(
            d.getId(),
            d.getCupof(),
            d.cantidadFranjasHorarias(),
            estadoDesignacion,
            d.getRolEducativo(),
            d.getMateria().getNombre(),
            d.getCurso().anioDivision(),
            d.getOrientacion(),
            AsignacionMapper.toRow(cargoActivo));
  }

  // ---------------------------
  // Entity builders
  // ---------------------------

  public static DesignacionAdministrativa toEntity(DesignacionAdministrativaDTO dto, Escuela e) {
    DesignacionAdministrativa d = new DesignacionAdministrativa(e, dto.cupof(), dto.rolEducativo());

    dto.franjasHorarias().forEach(f -> d.agregarFranjaHoraria(FranjaHorariaMapper.toEntity(f)));

    return d;
  }

  public static DesignacionCurso toEntity(
      DesignacionCursoDTO dto, Escuela escuela, Curso curso, Materia materia, String orientacion) {
    DesignacionCurso designacion =
        new DesignacionCurso(escuela, dto.cupof(), materia, curso, orientacion);

    dto.franjasHorarias()
        .forEach(f -> designacion.agregarFranjaHoraria(FranjaHorariaMapper.toEntity(f)));

    return designacion;
  }

  // ---------------------------
  // Private helpers
  // ---------------------------

  private static List<AsignacionDetalleDTO> asignaciones(Designacion d) {
    return d.getAsignaciones().stream()
        .map(a -> AsignacionMapper.toDetalle(a, a.getEstadoEn(LocalDate.now())))
        .toList();
  }

  private static List<FranjaHorariaMinimoDTO> franjas(Designacion d) {
    return d.getFranjasHorarias().stream().map(FranjaHorariaMapper::toMinimo).toList();
  }

  public static DesignacionAsignacionDTO toDesignacionDTO(
      Designacion d, EstadoDesignacion estadoDesignacion) {

    if (d instanceof DesignacionCurso curso) {
      return new DesignacionCursoAsignacionDTO(
          curso.getId(),
          curso.getCupof(),
          estadoDesignacion,
          curso.getMateria().getNombre(),
          curso.getCurso().toString(),
          curso.getOrientacion());
    }

    if (d instanceof DesignacionAdministrativa administrativa) {
      return new DesignacionAdministrativaAsignacionDTO(
          administrativa.getId(),
          administrativa.getCupof(),
          estadoDesignacion,
          administrativa.getRolEducativo());
    }

    throw new IllegalArgumentException(
        "Tipo de designación no soportado: " + d.getClass().getSimpleName());
  }
}
