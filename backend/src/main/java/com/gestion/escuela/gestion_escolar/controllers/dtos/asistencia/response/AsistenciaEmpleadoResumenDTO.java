package com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoBasicoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

import java.util.List;

public record AsistenciaEmpleadoResumenDTO(
		EmpleadoEducativoBasicoDTO empleadoBasico,
		List<RolEducativo> roles,
		int faltasUltimoMes,
		TipoLicencia licenciaMasFrecuente
) { }

