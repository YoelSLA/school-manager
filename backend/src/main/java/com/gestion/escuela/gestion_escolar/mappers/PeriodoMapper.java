package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.PeriodoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.PeriodoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;

public class PeriodoMapper {

	public static PeriodoResponseDTO toPeriodoResponse(Licencia licencia) {

		Periodo periodo = licencia.getPeriodo();

		return new PeriodoResponseDTO(
				periodo.getFechaDesde(),
				periodo.getFechaHasta(),
				periodo.esAbierto() ? null : licencia.dias()
		);
	}

	public static PeriodoResponseDTO toPeriodoResponse(Asignacion asignacion) {
		Periodo periodo = asignacion.getPeriodo();
		return new PeriodoResponseDTO(
				periodo.getFechaDesde(),
				periodo.getFechaHasta(),
				periodo.esAbierto() ? null : periodo.dias()
		);
	}

	public static Periodo toEntity(PeriodoCreateDTO dto) {

		if (dto.fechaHasta() == null) {
			return Periodo.abierto(dto.fechaDesde());
		}

		return Periodo.cerrado(dto.fechaDesde(), dto.fechaHasta());
	}
}
