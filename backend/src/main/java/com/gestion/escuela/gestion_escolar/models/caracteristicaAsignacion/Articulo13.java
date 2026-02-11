package com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("ARTICULO_13")
public class Articulo13 extends CaracteristicaAsignacion {

	@Override
	public void validarAplicacion(Asignacion asignacion) {
//		if (!asignacion.getDesignacion().getRol().esAuxiliar()) {
//			throw new ReglaDeNegocioException(
//					"El artículo 13 solo aplica a roles auxiliares"
//			);
//		}
	}
}

