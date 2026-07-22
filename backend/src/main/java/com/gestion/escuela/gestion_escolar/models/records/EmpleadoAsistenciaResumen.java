package com.gestion.escuela.gestion_escolar.models.records;

import com.gestion.escuela.gestion_escolar.models.LicenciaEstatutaria;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import java.util.List;

public record EmpleadoAsistenciaResumen(
    List<RolEducativo> rolesActivos,
    int faltasUltimoMes,
    LicenciaEstatutaria licenciaMasFrecuente) {}
