package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("RECALIFICACION")
public class AsignacionRecalificacionDefinitiva extends Asignacion {

	public AsignacionRecalificacionDefinitiva() {
	}

	public AsignacionRecalificacionDefinitiva(Designacion designacion, EmpleadoEducativo empleado, LocalDate fechaTomaPosesion, LocalDate fechaCese, SituacionDeRevista situacion) {
		super(designacion, empleado, fechaTomaPosesion, fechaCese, situacion);
	}
	
	@Override
	public boolean ejerceCargoEn(LocalDate fecha) {
		return false;
	}

	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.TITULAR;
	}
}
