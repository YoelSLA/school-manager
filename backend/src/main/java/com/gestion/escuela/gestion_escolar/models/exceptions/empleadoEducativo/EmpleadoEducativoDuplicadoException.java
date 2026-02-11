package com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo;

public class EmpleadoEducativoDuplicadoException extends RuntimeException {

	public EmpleadoEducativoDuplicadoException(
			String campo,
			String valor,
			String nombreEscuela
	) {
		super(
				"Ya existe un empleado con " + campo +
						" '" + valor +
						"' en la escuela " + nombreEscuela
		);
	}
}

