package com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CAMBIO_FUNCION")
public class CambioDeFuncion extends CaracteristicaAsignacion {

	@Override
	public void validarAplicacion(Asignacion asignacion) {
//		if (!(asignacion instanceof AsignacionTitular)) {
//			throw new ReglaDeNegocioException(
//					"El cambio de función solo aplica a titulares"
//			);
//		}
	}

	@Override
	public void alAsignarse(Asignacion asignacion) {
//		// ejemplo de comportamiento futuro
//		asignacion.getDesignacion().cambiarRol(...);
	}
}

