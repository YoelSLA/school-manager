package com.gestion.escuela.gestion_escolar.models.domainServices;

import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.ReglaCicloLectivoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;

import java.time.LocalDate;

public class PoliticaDeRenovacion {

	public static void validarRenovarProvisionalManual(AsignacionProvisional anterior, Periodo nuevoPeriodo) {

		Validaciones.noNulo(anterior, "asignación anterior");
		Validaciones.noNulo(nuevoPeriodo, "periodo");

		LocalDate fechaMinimaInicio = anterior.getPeriodo().getFechaHasta().plusDays(1);

		if (nuevoPeriodo.getFechaDesde().isBefore(fechaMinimaInicio)) {
			throw new RangoFechasInvalidoException(fechaMinimaInicio, nuevoPeriodo.getFechaDesde());
		}

		validarReglaCicloLectivo(nuevoPeriodo);
	}

	public static void validarRenovarProvisionalDesdeMarzo(Asignacion asignacion, LocalDate fechaHasta) {

		Validaciones.noNulo(asignacion, "asignación anterior");
		Validaciones.noNulo(fechaHasta, "fecha hasta");

	}

	public static void validarReglaCicloLectivo(Periodo periodo) {

		Validaciones.noNulo(periodo, "periodo");

		LocalDate desde = periodo.getFechaDesde();
		LocalDate hasta = periodo.getFechaHasta();

		Validaciones.noNulo(desde, "fecha desde");
		Validaciones.noNulo(hasta, "fecha hasta");

		int anio = desde.getYear();

		LocalDate primeroDeMarzo = LocalDate.of(anio, 3, 1);
		LocalDate primeroDeMarzoSiguiente = LocalDate.of(anio + 1, 3, 1);

		// 1️) Debe comenzar el 1 de marzo
		if (!desde.equals(primeroDeMarzo)) {
			throw new ReglaCicloLectivoException("La asignación provisional debe iniciar el 1 de marzo");
		}

		// 2️) Debe finalizar antes del 1 de marzo siguiente
		if (!hasta.isBefore(primeroDeMarzoSiguiente)) {
			throw new ReglaCicloLectivoException("La fecha fin debe ser anterior al 1 de marzo del año siguiente");
		}

	}
}
