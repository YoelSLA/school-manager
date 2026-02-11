package com.gestion.escuela.gestion_escolar.models.asignacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("SUPLENTE")
public class AsignacionSuplente extends Asignacion {

	protected AsignacionSuplente() {
	}

	public AsignacionSuplente(
			EmpleadoEducativo empleado,
			Periodo periodo
	) {
		super(empleado, periodo);
		
	}

	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.SUPLENTE;
	}

	public void convertirseEnProvisional(LocalDate fechaInicio, Designacion designacion) {
		// 1️⃣ Finalizar suplencia
		this.finalizarPorBajaDefinitiva(CausaBaja.PASE_DE_SUPLENTE_A_PROVISIONAL, fechaInicio);

		// 2️⃣ Crear provisional
		designacion.cubrirConProvisional(this.empleadoEducativo, fechaInicio);

	}
}

