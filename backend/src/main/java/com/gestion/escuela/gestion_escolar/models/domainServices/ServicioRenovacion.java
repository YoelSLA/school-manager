package com.gestion.escuela.gestion_escolar.models.domainServices;

import com.gestion.escuela.gestion_escolar.models.AsignacionFactory;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;

import java.time.LocalDate;

public class ServicioRenovacion {

	public static AsignacionProvisional renovarProvisionalAutomatica(
			Designacion designacion,
			AsignacionProvisional anterior,
			Integer secuencia
	) {

		Validaciones.noNulo(
				anterior,
				"asignación anterior"
		);

		LocalDate desde =
				CalendarioEscolar
						.inicioCicloLectivoSiguiente(
								anterior.getPeriodo()
										.getFechaHasta()
						);

		Periodo nuevoPeriodo =
				CalendarioEscolar
						.periodoProvisionalAutomaticoDesde(
								desde
						);

		PoliticaDeRenovacion
				.validarReglaCicloLectivo(
						nuevoPeriodo
				);

		AsignacionProvisional asignacion =
				AsignacionFactory.crearProvisional(
						anterior.getEmpleadoEducativo(),
						designacion,
						nuevoPeriodo,
						secuencia
				);

		return designacion.registrar(asignacion);
	}

	public static AsignacionProvisional renovarProvisionalDesdeMarzo(
			Designacion designacion,
			AsignacionProvisional asignacionAnterior,
			LocalDate fechaHasta,
			Integer secuencia
	) {

		PoliticaDeRenovacion
				.validarRenovarProvisionalDesdeMarzo(
						asignacionAnterior,
						fechaHasta
				);

		LocalDate desde =
				CalendarioEscolar
						.inicioCicloLectivoSiguiente(
								asignacionAnterior
										.getPeriodo()
										.getFechaHasta()
						);

		Periodo nuevoPeriodo =
				Periodo.cerrado(
						desde,
						fechaHasta
				);

		PoliticaDeRenovacion
				.validarReglaCicloLectivo(
						nuevoPeriodo
				);

		AsignacionProvisional asignacion =
				AsignacionFactory.crearProvisional(
						asignacionAnterior.getEmpleadoEducativo(),
						designacion,
						nuevoPeriodo,
						secuencia
				);

		return designacion.registrar(asignacion);
	}

	public static AsignacionProvisional renovarProvisionalManual(
			Designacion designacion,
			AsignacionProvisional anterior,
			Periodo nuevoPeriodo,
			Integer secuencia
	) {

		PoliticaDeRenovacion
				.validarRenovarProvisionalManual(
						anterior,
						nuevoPeriodo
				);

		AsignacionProvisional asignacion =
				AsignacionFactory.crearProvisional(
						anterior.getEmpleadoEducativo(),
						designacion,
						nuevoPeriodo,
						secuencia
				);

		return designacion.registrar(asignacion);
	}
}