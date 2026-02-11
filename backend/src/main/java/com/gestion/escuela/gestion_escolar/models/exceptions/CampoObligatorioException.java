package com.gestion.escuela.gestion_escolar.models.exceptions;

public class CampoObligatorioException extends DominioException {

	private final String campo;

	public CampoObligatorioException(String campo) {
		super("El campo '" + campo + "' es obligatorio");
		this.campo = campo;
	}

	public String getCampo() {
		return campo;
	}
}