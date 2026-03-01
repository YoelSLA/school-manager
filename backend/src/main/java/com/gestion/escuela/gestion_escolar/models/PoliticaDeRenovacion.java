package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;

import java.time.LocalDate;

public class PoliticaDeRenovacion {

	public static void validarRenovarProvisionalManual(AsignacionProvisional anterior, Periodo nuevoPeriodo) {

		Validaciones.noNulo(anterior, "asignación anterior");
		Validaciones.noNulo(nuevoPeriodo, "periodo");

		if (nuevoPeriodo.getFechaDesde()
				.isBefore(anterior.getPeriodo().getFechaHasta().plusDays(1))) {
			throw new RangoFechasInvalidoException(
					anterior.getPeriodo().getFechaHasta().plusDays(1),
					nuevoPeriodo.getFechaDesde()
			);
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

		// 1️⃣ Debe comenzar el 1 de marzo
		if (!desde.equals(primeroDeMarzo)) {
			throw new IllegalArgumentException("La asignación provisional debe iniciar el 1 de marzo");
		}

		// 2️⃣ Debe finalizar antes del 1 de marzo siguiente

		if (!desde.isBefore(primeroDeMarzoSiguiente)) {
			throw new IllegalArgumentException("La fecha fin debe ser anterior al 1 de marzo del año siguiente");
		}

	}
}
