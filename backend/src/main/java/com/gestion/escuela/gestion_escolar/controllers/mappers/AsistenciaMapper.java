package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.response.AsistenciaDiaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asistencia.response.AsistenciaEmpleadoResumenDTO;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.EstadoAsistenciaDia;
import com.gestion.escuela.gestion_escolar.models.enums.OrigenAsistencia;
import com.gestion.escuela.gestion_escolar.models.records.EmpleadoAsistenciaResumen;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AsistenciaMapper {

	public static AsistenciaDiaDTO toDiaDTO(
			EstadoAsistenciaDia estado
	) {

		return new AsistenciaDiaDTO(
				estado.getAsistenciaId(),
				estado.getFecha(),
				estado.getEstadoAsistencia(),
				AsistenciaMapper.obtenerOrigen(estado),
				estado.getTipoLicencia() != null
						? estado.getTipoLicencia().getCodigo()
						: null,
				estado.getLicencia() != null
						? LicenciaMapper.toResumen(estado.getLicencia())
						: null
		);
	}

	public static AsistenciaEmpleadoResumenDTO toResumenDTO(
			EmpleadoEducativo empleado,
			EmpleadoAsistenciaResumen resumen
	) {

		return new AsistenciaEmpleadoResumenDTO(
				EmpleadoEducativoMapper.toBasico(empleado),
				resumen.rolesActivos(),
				resumen.faltasUltimoMes(),
				resumen.licenciaMasFrecuente() != null ? resumen.licenciaMasFrecuente().getCodigo() : null
		);
	}

	private static OrigenAsistencia obtenerOrigen(
			EstadoAsistenciaDia estado
	) {
		if (estado.esManual()) {
			return OrigenAsistencia.MANUAL;
		}

		if (estado.esPorLicencia()) {
			return OrigenAsistencia.LICENCIA;
		}

		return null;
	}
}