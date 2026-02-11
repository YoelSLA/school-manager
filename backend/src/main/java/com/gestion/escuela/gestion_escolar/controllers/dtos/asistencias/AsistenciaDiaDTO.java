package com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResumenDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.OrigenAsistencia;

import java.time.LocalDate;

public record AsistenciaDiaDTO(
		Long id,
		// null si es PRESENTE
		LocalDate fecha,
		EstadoAsistencia estadoAsistencia,
		// PRESENTE | AUSENTE
		OrigenAsistencia origenAsistencia,
		// MANUAL | LICENCIA | null si PRESENTE
		String tipoLicencia,
		// solo si aplica
		LicenciaResumenDTO licencia
		// solo si aplica
) {
}
