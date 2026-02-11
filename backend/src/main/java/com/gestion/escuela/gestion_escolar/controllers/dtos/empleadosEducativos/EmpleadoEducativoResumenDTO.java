package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.time.LocalDate;
import java.util.Set;

public record EmpleadoEducativoResumenDTO(
		Long id,
		String cuil,
		String nombre,
		String apellido,
		LocalDate fechaDeIngreso,
		boolean activo,
		Set<RolEducativo> rolesVigentes
) {
}