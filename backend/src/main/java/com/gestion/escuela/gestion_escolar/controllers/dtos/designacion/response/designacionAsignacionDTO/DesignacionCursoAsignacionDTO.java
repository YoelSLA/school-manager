package com.gestion.escuela.gestion_escolar.controllers.dtos.designacion.response.designacionAsignacionDTO;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

public record DesignacionCursoAsignacionDTO(
    Long id,
    Integer cupof,
    EstadoDesignacion estadoDesignacion,
    RolEducativo rolEducativo,
    String materia,
    String curso,
    String orientacion)
    implements DesignacionAsignacionDTO {}
