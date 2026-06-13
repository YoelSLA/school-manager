package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;

import java.time.LocalDate;

public class AsignacionFactory {

	private AsignacionFactory() {}

	public static AsignacionTitular crearTitular(
			EmpleadoEducativo empleadoEducativo,
			Designacion designacion,
			LocalDate fechaTomaPosesion,
			Integer secuencia
	) {
		return AsignacionTitular.builder()
				.empleadoEducativo(empleadoEducativo)
				.designacion(designacion)
				.periodo(Periodo.abierto(fechaTomaPosesion))
				.secuencia(secuencia)
				.build();
	}

	public static AsignacionProvisional crearProvisional(
			EmpleadoEducativo empleadoEducativo,
			Designacion designacion,
			Periodo periodo,
			Integer secuencia
	) {

		return AsignacionProvisional.builder()
				.empleadoEducativo(empleadoEducativo)
				.designacion(designacion)
				.periodo(periodo)
				.secuencia(secuencia)
				.build();
	}

	public static AsignacionSuplente crearSuplente(
			EmpleadoEducativo empleadoEducativo,
			Designacion designacion,
			Periodo periodo,
			Licencia licencia,
			Integer secuencia
	) {

		return AsignacionSuplente.builder()
				.empleadoEducativo(empleadoEducativo)
				.designacion(designacion)
				.periodo(periodo)
				.licencia(licencia)
				.secuencia(secuencia)
				.build();

	}
}