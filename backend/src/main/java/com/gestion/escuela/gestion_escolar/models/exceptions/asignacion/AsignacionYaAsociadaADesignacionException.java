package com.gestion.escuela.gestion_escolar.models.exceptions.asignacion;

public class AsignacionYaAsociadaADesignacionException extends RuntimeException {
	public AsignacionYaAsociadaADesignacionException() {
		super("La asignación ya pertenece a una designación");
	}
}
