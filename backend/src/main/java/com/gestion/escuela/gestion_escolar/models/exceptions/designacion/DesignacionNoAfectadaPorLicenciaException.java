package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

public class DesignacionNoAfectadaPorLicenciaException extends RuntimeException {

	public DesignacionNoAfectadaPorLicenciaException(Long designacionId, Long licenciaId) {
		super(
				"La designación con id " + designacionId +
						" no está afectada por la licencia con id " + licenciaId
		);
	}
}
