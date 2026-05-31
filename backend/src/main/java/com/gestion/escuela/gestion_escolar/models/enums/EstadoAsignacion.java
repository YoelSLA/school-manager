package com.gestion.escuela.gestion_escolar.models.enums;

public enum EstadoAsignacion {

	PENDIENTE("Pendiente", false, false),
	ACTIVA("Activa", true, true),
	LICENCIA("En licencia", true, false),
	FINALIZADA("Finalizada", false, false),
	BAJA("Dada de baja", false, false);

	private final String descripcion;
	private final boolean vigente;
	private final boolean ejerciendo;

	EstadoAsignacion(
			String descripcion,
			boolean vigente,
			boolean ejerciendo
	) {
		this.descripcion = descripcion;
		this.vigente = vigente;
		this.ejerciendo = ejerciendo;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public boolean estaVigente() {
		return vigente;
	}

	public boolean estaEjerciendo() {
		return ejerciendo;
	}

	public boolean estaFinalizada() {
		return !vigente && this != PENDIENTE;
	}
}