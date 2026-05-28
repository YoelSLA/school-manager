package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.request.PeriodoAbiertoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.request.PeriodoCerradoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.request.PeriodoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoAbiertoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoCerradoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoDTO;
import com.gestion.escuela.gestion_escolar.models.Periodo;

import java.time.LocalDate;

public class PeriodoMapper {

	public static PeriodoDTO toDTO(Periodo periodo) {
		if (periodo.esAbierto()) {
			return new PeriodoAbiertoDTO(
					periodo.getFechaDesde()
			);
		}
		return new PeriodoCerradoDTO(
				periodo.getFechaDesde(),
				periodo.getFechaHasta(),
				periodo.dias()
		);
	}

	public static PeriodoCerradoDTO toCerradoDTO(Periodo periodo) {
		if (periodo.esAbierto()) {
			throw new UnsupportedOperationException(
					"Se esperaba un período cerrado"
			);
		}
		return new PeriodoCerradoDTO(
				periodo.getFechaDesde(),
				periodo.getFechaHasta(),
				periodo.dias()
		);
	}

	public static PeriodoAbiertoDTO toAbiertoDTO(Periodo periodo) {
		if (!periodo.esAbierto()) {
			throw new UnsupportedOperationException(
					"Se esperaba un período abierto"
			);
		}
		return new PeriodoAbiertoDTO(periodo.getFechaDesde());
	}

	public static Periodo toEntity(PeriodoCreateDTO dto) {

		return switch (dto) {

			case PeriodoAbiertoCreateDTO(
					LocalDate fechaDesde
			) -> Periodo.abierto(fechaDesde);

			case PeriodoCerradoCreateDTO(
					LocalDate fechaDesde,
					LocalDate fechaHasta
			) -> Periodo.cerrado(
					fechaDesde,
					fechaHasta
			);
		};
	}
}