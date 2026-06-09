package com.gestion.escuela.gestion_escolar.models.records;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

import java.util.List;

public record EmpleadoAsistenciaResumen(
		List<RolEducativo> rolesActivos,
		int faltasUltimoMes,
		TipoLicencia licenciaMasFrecuente
) {
}