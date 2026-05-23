package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;

import java.time.LocalDate;

public class AsignacionFactory {

	public static AsignacionTitular crearTitular(
			EmpleadoEducativo empleado,
			Designacion designacion,
			LocalDate fechaTomaPosesion,
			Integer secuencia
	) {
		return new AsignacionTitular(
				empleado,
				designacion,
				fechaTomaPosesion,
				secuencia
		);
	}

	public static AsignacionProvisional crearProvisional(
			EmpleadoEducativo empleado,
			Designacion designacion,
			Periodo periodo,
			Integer secuencia
	) {

		return new AsignacionProvisional(
				empleado,
				designacion,
				periodo,
				secuencia
		);
	}

	public static AsignacionSuplente crearSuplente(
			EmpleadoEducativo empleado,
			Designacion designacion,
			Periodo periodo,
			Integer secuencia
	) {

		return new AsignacionSuplente(
				empleado,
				designacion,
				periodo,
				secuencia
		);
	}
}