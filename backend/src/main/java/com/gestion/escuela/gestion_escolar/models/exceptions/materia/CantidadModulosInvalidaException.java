package com.gestion.escuela.gestion_escolar.models.exceptions.materia;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class CantidadModulosInvalidaException extends GestionEscolarException {

	public CantidadModulosInvalidaException(Integer cantidad) {
		super("La cantidad de módulos debe ser mayor a 0. Valor recibido: " + cantidad);
	}
}