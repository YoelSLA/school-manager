package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("TITULAR")
public class AsignacionTitular extends Asignacion {

	protected AsignacionTitular() {
	}

	public AsignacionTitular(EmpleadoEducativo empleado, LocalDate fechaTomaPosesion) {
		super(empleado, new Periodo(fechaTomaPosesion, null));
	}

	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.TITULAR;
	}

	@Override
	public boolean puedeGenerarVacanteDefinitiva() {
		return true;
	}
}
