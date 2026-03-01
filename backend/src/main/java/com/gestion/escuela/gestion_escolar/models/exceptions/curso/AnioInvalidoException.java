package com.gestion.escuela.gestion_escolar.models.exceptions.curso;

public class AnioInvalidoException extends RuntimeException {

	public AnioInvalidoException(Integer anio) {
		super("El año debe ser mayor a 0. Valor recibido: " + anio);
	}
}
