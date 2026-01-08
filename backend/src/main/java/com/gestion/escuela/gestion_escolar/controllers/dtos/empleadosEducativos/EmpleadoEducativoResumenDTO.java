package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import java.time.LocalDate;

public record EmpleadoEducativoResumenDTO(

		Long id,
		String cuil,
		String nombre,
		String apellido,
		LocalDate fechaDeIngreso,
		boolean activo

) {
}