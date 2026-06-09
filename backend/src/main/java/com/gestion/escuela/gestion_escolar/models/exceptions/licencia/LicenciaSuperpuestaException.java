package com.gestion.escuela.gestion_escolar.models.exceptions.licencia;

import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class LicenciaSuperpuestaException extends GestionEscolarException {

	public LicenciaSuperpuestaException() {
		super("El empleadoEducativoBasico ya posee una licencia que se superpone con el período indicado");
	}
}
