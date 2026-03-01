package com.gestion.escuela.gestion_escolar.models.exceptions.materia;

public class MateriaNoPerteneceAEscuelaException extends RuntimeException {
	public MateriaNoPerteneceAEscuelaException(Long materiaId, Long escuelaId) {
		super("La materia " + materiaId + " no pertenece a la escuela " + escuelaId);
	}
}
