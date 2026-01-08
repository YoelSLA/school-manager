package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("ARTICULO_13")
public class AsignacionArticulo13 extends Asignacion {

	public AsignacionArticulo13() {
	}

	public AsignacionArticulo13(Designacion designacion, EmpleadoEducativo empleado, LocalDate fechaTomaPosesion, LocalDate fechaCese, SituacionDeRevista situacion) {
		super(designacion, empleado, fechaTomaPosesion, fechaCese, situacion);

	}

	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.PROVISIONAL;
	}

}

