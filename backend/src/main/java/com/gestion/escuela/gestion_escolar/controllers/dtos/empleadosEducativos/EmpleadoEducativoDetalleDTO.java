package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResumenDTO;

import java.time.LocalDate;
import java.util.List;

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
		List<AsignacionDetalleDTO> asignaciones,
		List<LicenciaResumenDTO> licencias
) {

}