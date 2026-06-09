package com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaResumenDTO;
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
		String codigoLicencia,
		// solo si aplica
		LicenciaResumenDTO licencia
		// solo si aplica
) {
}
