package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;

import java.time.LocalDate;

public record LicenciaResponseDTO(
		Long id,
		Long designacionId,
		EmpleadoEducativoMinimoDTO empleado,
		LocalDate fechaDesde,
		LocalDate fechaHasta,
		boolean activa,
		boolean cubierta,
		Integer cupof,
		SituacionDeRevista situacionDeRevista,
		String codigo,
		String articulo,
		String descripcion
) {
}



