package com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("RECALIFICACION")
public class RecalificacionLaboralDefinitiva extends CaracteristicaAsignacion {

	@Override
	public void validarAplicacion(Asignacion asignacion) {
//		if (!(asignacion instanceof AsignacionTitular)) {
//			throw new ReglaDeNegocioException(
//					"Solo un titular puede recalificarse"
//			);
//		}
	}
}
