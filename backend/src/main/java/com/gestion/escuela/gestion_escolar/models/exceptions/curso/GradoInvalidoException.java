package com.gestion.escuela.gestion_escolar.models.exceptions.curso;

public class GradoInvalidoException extends RuntimeException {

	public GradoInvalidoException(Integer grado) {
		super("El grado debe ser mayor a 0. Valor recibido: " + grado);
	}
}