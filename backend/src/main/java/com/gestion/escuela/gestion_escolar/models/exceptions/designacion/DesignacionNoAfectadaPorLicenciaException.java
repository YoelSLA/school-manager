package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class DesignacionNoAfectadaPorLicenciaException extends GestionEscolarException {

	public DesignacionNoAfectadaPorLicenciaException(Long designacionId, Long licenciaId) {
		super(
				"La designación con id " + designacionId +
						" no está afectada por la licencia con id " + licenciaId
		);
	}
}
