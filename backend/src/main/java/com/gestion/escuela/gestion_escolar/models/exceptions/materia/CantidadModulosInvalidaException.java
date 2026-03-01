package com.gestion.escuela.gestion_escolar.models.exceptions.materia;

public class CantidadModulosInvalidaException extends RuntimeException {

	public CantidadModulosInvalidaException(Integer cantidad) {
		super("La cantidad de módulos debe ser mayor a 0. Valor recibido: " + cantidad);
	}
}