package com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.exceptions.DominioException;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("RECALIFICACION")
public class RecalificacionLaboralDefinitiva extends CaracteristicaAsignacion {

	@Override
	public void validarAplicacion(Asignacion asignacion) {
		if (!(asignacion instanceof AsignacionTitular)) {
			throw new DominioException(
					"La recalificación laboral definitiva solo aplica a titulares"
			);
		}
	}
}
