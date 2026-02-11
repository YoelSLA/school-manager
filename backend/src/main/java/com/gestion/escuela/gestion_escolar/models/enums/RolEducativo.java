package com.gestion.escuela.gestion_escolar.models.enums;

public enum RolEducativo {
	DIRECCION("Dirección"),
	VICEDIRECCION("Vicedirección"),
	SECRETARIA("Secretaría"),
	BIBLIOTECARIO("Bibliotecario"),
	ORIENTACION_EDUCACIONAL("Orientación Educacional"),
	ORIENTACION_SOCIAL("Orientación Social"),
	PRECEPTORIA("Preceptoría"),
	DOCENTE("Docente"),
	AUXILIAR("Auxiliar"),
	ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL(
			"Encargo de Medio de Apoyo Técnico Profesional"
	);

	private final String label;

	RolEducativo(String label) {
		this.label = label;
	}

	public String getLabel() {
		return label;
	}
}
