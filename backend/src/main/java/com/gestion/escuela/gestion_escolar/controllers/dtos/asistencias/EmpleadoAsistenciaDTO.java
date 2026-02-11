package com.gestion.escuela.gestion_escolar.controllers.dtos.asistencias;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.time.LocalDate;
import java.util.List;

public record EmpleadoAsistenciaDTO(
		Long id,
		String cuil,
		String nombre,
		String apellido,
		List<RolEducativo> roles
) {
	public static EmpleadoAsistenciaDTO from(
			EmpleadoEducativo empleado,
			LocalDate fecha
	) {
		return new EmpleadoAsistenciaDTO(
				empleado.getId(),
				empleado.getCuil(),
				empleado.getNombre(),
				empleado.getApellido(),
				empleado.getAsignaciones().stream()
						.filter(a ->
								!a.getPeriodo().getFechaDesde().isAfter(fecha) &&
										(
												a.getPeriodo().getFechaHasta() == null ||
														!a.getPeriodo().getFechaHasta().isBefore(fecha)
										)
						)
						.map(a -> a.getDesignacion().getRolEducativo())
						.distinct()
						.toList()
		);
	}
}

