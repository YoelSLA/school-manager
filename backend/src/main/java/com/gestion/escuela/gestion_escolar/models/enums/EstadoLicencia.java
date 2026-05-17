package com.gestion.escuela.gestion_escolar.models.enums;

public enum EstadoLicencia {

	PENDIENTE("Pendiente"),
	DESCUBIERTA("Descubierta"),
	CUBIERTA("Cubierta"),
	FINALIZADA("Finalizada");

	private final String descripcion;

	EstadoLicencia(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public boolean estaActiva() {
		return this == DESCUBIERTA || this == CUBIERTA;
	}

	public boolean estaFinalizada() {
		return this == FINALIZADA;
	}

	public boolean estaPendiente() {
		return this == PENDIENTE;
	}

	public boolean estaCubierta() {
		return this == CUBIERTA;
	}

	public boolean estaDescubierta() {
		return this == DESCUBIERTA;
	}
}