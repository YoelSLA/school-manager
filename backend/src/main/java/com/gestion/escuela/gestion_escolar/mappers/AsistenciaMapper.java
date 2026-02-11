package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.AsistenciaDiaDTO;
import com.gestion.escuela.gestion_escolar.models.Asistencia;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.OrigenAsistencia;

import java.time.LocalDate;

public class AsistenciaMapper {

	public static AsistenciaDiaDTO toDiaDTO(
			LocalDate dia,
			Asistencia asistencia
	) {
		if (asistencia == null) {
			// 🟢 PRESENTE
			return new AsistenciaDiaDTO(
					null,
					dia,
					EstadoAsistencia.PRESENTE,
					null,
					null,
					null
			);
		}

		if (asistencia.getOrigenAsistencia() == OrigenAsistencia.MANUAL) {
			// 🔴 AUSENTE MANUAL
			return new AsistenciaDiaDTO(
					asistencia.getId(),
					dia,
					EstadoAsistencia.AUSENTE,
					OrigenAsistencia.MANUAL,
					asistencia.getTipoLicencia().getCodigo(),
					null
			);
		}

		// 🔵 AUSENTE POR LICENCIA
		return new AsistenciaDiaDTO(
				asistencia.getId(),
				dia,
				EstadoAsistencia.AUSENTE,
				OrigenAsistencia.LICENCIA,
				null,
				LicenciaMapper.toResumen(asistencia.getLicencia())
		);
	}

}
