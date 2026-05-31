package com.gestion.escuela.gestion_escolar.models.exceptions.curso;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class AnioInvalidoException extends GestionEscolarException {

	public AnioInvalidoException(Integer anio) {
		super("El año debe ser mayor a 0. Valor recibido: " + anio);
	}
}
