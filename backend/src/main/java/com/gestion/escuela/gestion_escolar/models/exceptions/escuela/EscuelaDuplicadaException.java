package com.gestion.escuela.gestion_escolar.models.exceptions.escuela;

public class EscuelaDuplicadaException extends RuntimeException {

	public EscuelaDuplicadaException(String nombre) {
		super("Ya existe una escuela con el nombre: " + nombre);
	}
}

