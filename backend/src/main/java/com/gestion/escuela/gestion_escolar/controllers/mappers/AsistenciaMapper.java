package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias.AsistenciaDiaDTO;
import com.gestion.escuela.gestion_escolar.models.EstadoAsistenciaDia;
import com.gestion.escuela.gestion_escolar.models.enums.OrigenAsistencia;

public class AsistenciaMapper {

	public static AsistenciaDiaDTO toDiaDTO(
			EstadoAsistenciaDia estado
	) {

		return new AsistenciaDiaDTO(
				estado.getAsistenciaId(),
				estado.getFecha(),
				estado.getEstadoAsistencia(),
				estado.esManual() ? OrigenAsistencia.MANUAL :
						estado.esPorLicencia() ? OrigenAsistencia.LICENCIA :
								null,
				estado.getTipoLicencia() != null
						? estado.getTipoLicencia().getCodigo()
						: null,
				estado.getLicencia() != null
						? LicenciaMapper.toResumen(estado.getLicencia())
						: null
		);
	}
}
