package com.gestion.escuela.gestion_escolar.models.exceptions;

import java.time.LocalDate;

public class FechaIngresoInvalidaException extends RuntimeException {

	public FechaIngresoInvalidaException(
			LocalDate fechaNacimiento,
			LocalDate fechaIngreso
	) {
		super(
				"La fecha de ingreso (" + fechaIngreso +
						") no puede ser anterior a la fecha de nacimiento (" +
						fechaNacimiento + ")"
		);
	}
}

