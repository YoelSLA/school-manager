package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("NORMAL")
public class AsignacionNormal extends Asignacion {

	public AsignacionNormal(Designacion designacion, EmpleadoEducativo empleadoEducativo, LocalDate fechaTomaPosesion, LocalDate fechaCese, SituacionDeRevista situacionDeRevista) {
		super(designacion, empleadoEducativo, fechaTomaPosesion, fechaCese, situacionDeRevista);
	}

	public AsignacionNormal() {
	}
}
