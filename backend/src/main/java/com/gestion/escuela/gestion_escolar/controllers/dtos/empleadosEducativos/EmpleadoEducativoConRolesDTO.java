package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.util.Set;

public record EmpleadoEducativoConRolesDTO(
		Long id,
		String cuil,
		String nombre,
		String apellido,
		Set<RolEducativo> rolesVigentes
) {
}