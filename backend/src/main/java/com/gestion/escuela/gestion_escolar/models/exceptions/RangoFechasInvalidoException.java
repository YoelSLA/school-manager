package com.gestion.escuela.gestion_escolar.models.exceptions;

import java.time.LocalDate;

public class RangoFechasInvalidoException extends DominioException {

	public RangoFechasInvalidoException(LocalDate fechaDesde, LocalDate fechaHasta) {
		super(String.format(
				"Rango de fechas inválido: fechaDesde (%s) no puede ser posterior a fechaHasta (%s)",
				fechaDesde,
				fechaHasta
		));
	}
}
