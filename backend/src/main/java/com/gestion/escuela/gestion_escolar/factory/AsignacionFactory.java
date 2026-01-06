package com.gestion.escuela.gestion_escolar.factory;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.asignacion.*;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.enums.TipoAsignacion;

import java.time.LocalDate;

public class AsignacionFactory {

	public static Asignacion crear(
			TipoAsignacion tipo,
			EmpleadoEducativo empleado,
			Designacion designacion,
			LocalDate fechaTomaPosesion,
			LocalDate fechaCese,
			SituacionDeRevista situacion
	) {

		return switch (tipo) {
			case NORMAL ->
					new AsignacionNormal(designacion, empleado, fechaTomaPosesion, fechaCese, situacion);
			case ARTICULO_13 ->
					new AsignacionArticulo13(designacion, empleado, fechaTomaPosesion, fechaCese, situacion);
			case CAMBIO_DE_FUNCION ->
					new AsignacionCambioDeFuncion(designacion, empleado, fechaTomaPosesion, fechaCese);
			case RECALIFICACION_LABORAL_DEFINITIVA ->
					new AsignacionRecalificacionDefinitiva(designacion, empleado, fechaTomaPosesion, fechaCese, situacion);
		};
	}
}
