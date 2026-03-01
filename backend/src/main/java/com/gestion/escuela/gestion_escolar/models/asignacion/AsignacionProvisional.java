package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PROVISIONAL")
public class AsignacionProvisional extends Asignacion {

	protected AsignacionProvisional() {
	}

	public AsignacionProvisional(
			EmpleadoEducativo empleado,
			Designacion designacion,
			Periodo periodo
	) {
		super(empleado, designacion, periodo);
	}

	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.PROVISIONAL;
	}
}