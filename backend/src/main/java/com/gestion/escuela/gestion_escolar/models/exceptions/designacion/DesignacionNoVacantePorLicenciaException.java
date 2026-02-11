package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

public class DesignacionNoVacantePorLicenciaException extends RuntimeException {

	public DesignacionNoVacantePorLicenciaException(Long designacionId) {
		super(
				"La designación"
						+ (designacionId != null ? " con id " + designacionId : "")
						+ " no se encuentra vacante por licencia en la fecha indicada"
		);
	}
}

