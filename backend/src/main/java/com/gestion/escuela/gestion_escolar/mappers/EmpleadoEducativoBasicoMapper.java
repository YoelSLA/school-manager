package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.EmpleadoEducativoBasicoResponseDTO;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;

public class EmpleadoEducativoBasicoMapper {

	private EmpleadoEducativoBasicoMapper() {
		// evita instanciación
	}

	public static EmpleadoEducativoBasicoResponseDTO toResponse(EmpleadoEducativo empleado) {
		if (empleado == null) {
			return null;
		}
		EmpleadoEducativoBasicoResponseDTO dto = new EmpleadoEducativoBasicoResponseDTO();
		dto.setCuil(empleado.getCuil());
		dto.setNombre(empleado.getNombre());
		dto.setApellido(empleado.getApellido());
		return dto;
	}
}

