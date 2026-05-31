package com.gestion.escuela.gestion_escolar.models.exceptions.curso;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class GradoInvalidoException extends GestionEscolarException {

	public GradoInvalidoException(Integer grado) {
		super("El grado debe ser mayor a 0. Valor recibido: " + grado);
	}
}