package com.gestion.escuela.gestion_escolar.models.enums;

public enum CausaBaja {

	RENUNCIA("Renuncia por causas particulares"),
	CESE_DE_FUNCIONES("Cese de funciones"),
	JUBILACION("Jubilación"),
	FALLECIMIENTO("Fallecimiento"),
	PASE_A_PROVISIONAL("Pase de suplente a provisional"),
	OTRA("Otra");

	private final String descripcion;

	CausaBaja(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getDescripcion() {
		return descripcion;
	}
}
