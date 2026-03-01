package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.CaracteristicaAsignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.exceptions.asignacion.AsignacionYaTieneCaracteristicaException;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("TITULAR")
public class AsignacionTitular extends Asignacion {

	protected AsignacionTitular() {
	}

	public AsignacionTitular(
			EmpleadoEducativo empleado,
			Designacion designacion,
			LocalDate fechaTomaPosesion
	) {
		super(empleado, designacion, new Periodo(fechaTomaPosesion, null));
	}


	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.TITULAR;
	}

	@Override
	public boolean puedeGenerarVacanteDefinitiva() {
		return true;
	}

	@Override
	public void aplicarCaracteristica(CaracteristicaAsignacion nueva) {
		if (this.getCaracteristica() != null) {
			throw new AsignacionYaTieneCaracteristicaException();
		}

		nueva.validarAplicacion(this);
		asignarCaracteristica(nueva);
		nueva.alAsignarse(this);
	}
}
