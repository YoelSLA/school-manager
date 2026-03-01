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
			Designacion designacion,
			Periodo periodo
	) {
		super(empleado, designacion, periodo);
	}

	@Override
	public SituacionDeRevista getSituacionDeRevista() {
		return SituacionDeRevista.SUPLENTE;
	}

	public void convertirseEnProvisional(LocalDate fechaDesde) {

		// 1️⃣ Finalizar suplencia (día anterior)
		LocalDate fechaFinSuplencia = fechaDesde.minusDays(1);

		this.finalizarPorBajaDefinitiva(
				CausaBaja.PASE_DE_SUPLENTE_A_PROVISIONAL,
				fechaFinSuplencia
		);

		// 2️⃣ Crear provisional automática
		getDesignacion().cubrirConProvisionalAutomatico(
				this.getEmpleadoEducativo(),
				fechaDesde
		);
	}

}
