package com.gestion.escuela.gestion_escolar.models.exceptions.designacion;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class DesignacionNoVacantePorLicenciaException extends GestionEscolarException {

	public DesignacionNoVacantePorLicenciaException(Long designacionId) {
		super(
				"La designación"
						+ (designacionId != null ? " con id " + designacionId : "")
						+ " no se encuentra vacante por licencia en la fecha indicada"
		);
	}
}

