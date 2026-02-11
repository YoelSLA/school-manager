package com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_caracteristica")
public abstract class CaracteristicaAsignacion {

	@Id
	@GeneratedValue
	private Long id;

	public abstract void validarAplicacion(Asignacion asignacion);

	// hooks de comportamiento futuro
	public void alAsignarse(Asignacion asignacion) {
	}

	public void alFinalizar(Asignacion asignacion) {
	}
}
