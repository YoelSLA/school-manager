package com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.exceptions.GestionEscolarException;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CAMBIO_FUNCION")
public class CambioDeFuncion extends CaracteristicaAsignacion {

	@Override
	public void validarAplicacion(Asignacion asignacion) {
		if (!(asignacion instanceof AsignacionTitular)) {
			throw new GestionEscolarException(
					"El cambio de función solo aplica a asignacion titulares"
			);
		}
	}

	@Override
	public void alAsignarse(Asignacion asignacion) {
		// comportamiento futuro
	}
}

