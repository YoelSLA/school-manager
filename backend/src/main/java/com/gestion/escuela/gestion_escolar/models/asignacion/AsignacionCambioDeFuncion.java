package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("CAMBIO_FUNCION")
@Getter
@Setter
public class AsignacionCambioDeFuncion extends Asignacion {

	public AsignacionCambioDeFuncion() {
	}

	public AsignacionCambioDeFuncion(Designacion designacion, EmpleadoEducativo empleadoEducativo, LocalDate fechaTomaPosesion, LocalDate fechaCese) {
		super(designacion, empleadoEducativo, fechaTomaPosesion, fechaCese, SituacionDeRevista.TITULAR);

	}
	
	@Override
	public boolean ejerceCargoEn(LocalDate fecha) {
		return false;
	}

}

