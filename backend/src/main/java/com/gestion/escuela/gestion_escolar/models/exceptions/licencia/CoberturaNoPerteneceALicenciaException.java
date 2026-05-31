package com.gestion.escuela.gestion_escolar.models.exceptions.licencia;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;

public class CoberturaNoPerteneceALicenciaException extends GestionEscolarException {

	public CoberturaNoPerteneceALicenciaException(
			Licencia licencia,
			Designacion designacion
	) {
		super(String.format(
				"La designación %d no tiene una cobertura asociada a la licencia %d",
				designacion.getId(),
				licencia.getId()
		));
	}
}
