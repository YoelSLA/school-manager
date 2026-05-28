package com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.response;

public record EmpleadoEducativoBasicoDTO(
		Long id,
		String cuil,
		String nombre,
		String apellido,
		boolean activo
) {}