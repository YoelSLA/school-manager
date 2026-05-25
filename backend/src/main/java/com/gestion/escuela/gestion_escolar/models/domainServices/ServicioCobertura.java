package com.gestion.escuela.gestion_escolar.models.domainServices;

import com.gestion.escuela.gestion_escolar.models.AsignacionFactory;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;

import java.time.LocalDate;

public class ServicioCobertura {

	public static AsignacionTitular cubrirConTitular(
			Designacion designacion,
			EmpleadoEducativo empleado,
			LocalDate fechaDesde,
			Integer secuencia
	) {

		PoliticaDeCobertura.validarCubrirConTitular(
				designacion,
				empleado,
				fechaDesde
		);

		AsignacionTitular asignacion =
				AsignacionFactory.crearTitular(
						empleado,
						designacion,
						fechaDesde,
						secuencia
				);

		designacion.agregarAsignacion(asignacion);
		return asignacion;
	}

	public static AsignacionProvisional cubrirConProvisionalAutomatico(
			Designacion designacion,
			EmpleadoEducativo empleado,
			LocalDate fechaInicio,
			Integer secuencia
	) {

		Periodo periodo = CalendarioEscolar.periodoProvisionalAutomaticoDesde(fechaInicio);

		PoliticaDeCobertura.validarCubrirConProvisionalAutomatico(
						designacion,
						empleado,
						fechaInicio,
						periodo
				);

		AsignacionProvisional asignacion = AsignacionFactory.crearProvisional(
				empleado,
				designacion,
				periodo,
				secuencia
		);

		designacion.agregarAsignacion(asignacion);
		return asignacion;
	}

	public static AsignacionProvisional cubrirConProvisionalManual(
			Designacion designacion,
			EmpleadoEducativo empleado,
			Periodo periodo,
			Integer secuencia
	) {

		PoliticaDeCobertura.validarCubrirConProvisionalManual(designacion, empleado, periodo);

		AsignacionProvisional asignacion = AsignacionFactory.crearProvisional(
				empleado,
				designacion,
				periodo,
				secuencia
		);

		designacion.agregarAsignacion(asignacion);
		return asignacion;
	}

	public static AsignacionSuplente cubrirConSuplente(
			Designacion designacion,
			Licencia licencia,
			EmpleadoEducativo suplente,
			LocalDate fechaInicio,
			Integer secuencia
	) {

		PoliticaDeCobertura.validarCubrirConSuplente(designacion, licencia, suplente, fechaInicio);

		Periodo periodo = Periodo.cerrado(fechaInicio, licencia.getPeriodo().getFechaHasta());

		AsignacionSuplente asignacion = AsignacionFactory.crearSuplente(
				suplente,
				designacion,
				periodo,
				licencia,
				secuencia
		);

		designacion.agregarAsignacion(asignacion);
		return asignacion;
	}
}