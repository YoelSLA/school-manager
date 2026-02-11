package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public record EmpleadoEducativoDetalleDTO(
		Long id,
		String cuil,
		String nombre,
		String apellido,
		String domicilio,
		String telefono,
		String email,
		LocalDate fechaDeNacimiento,
		LocalDate fechaDeIngreso,
		boolean activo,
		List<EmpleadoEducativoAsignacionItemDTO> asignaciones,
		List<EmpleadoEducativoLicenciaItemDTO> licencias,
		Set<RolEducativo> rolesVigentes
) {

}