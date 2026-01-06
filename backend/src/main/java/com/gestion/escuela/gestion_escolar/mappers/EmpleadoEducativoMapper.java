package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.*;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;

public class EmpleadoEducativoMapper {

	public static EmpleadoEducativoMinimoDTO toMinimo(EmpleadoEducativo e) {
		return new EmpleadoEducativoMinimoDTO(
				e.getId(),
				e.getCuil(),
				e.getNombre(),
				e.getApellido()
		);
	}

	public static EmpleadoEducativoResumenDTO toResumen(EmpleadoEducativo e) {
		return new EmpleadoEducativoResumenDTO(
				e.getId(),
				e.getCuil(),
				e.getNombre(),
				e.getApellido(),
				e.getFechaDeIngreso(),
				e.estaActivo()
		);
	}

	public static EmpleadoEducativoDetalleDTO toDetalle(EmpleadoEducativo e) {
		return new EmpleadoEducativoDetalleDTO(
				e.getId(),
				e.getCuil(),
				e.getNombre(),
				e.getApellido(),
				e.getDomicilio(),
				e.getTelefono(),
				e.getEmail(),
				e.getFechaDeNacimiento(),
				e.getFechaDeIngreso(),
				e.estaActivo()
		);
	}

	public static EmpleadoEducativoEditDTO toEdit(EmpleadoEducativo e) {
		return new EmpleadoEducativoEditDTO(
				e.getId(),
				e.getNombre(),
				e.getApellido(),
				e.getDomicilio(),
				e.getTelefono(),
				e.getEmail(),
				e.getFechaDeNacimiento(),
				e.getFechaDeIngreso()
		);
	}

	public static EmpleadoEducativo toEntity(EmpleadoEducativoCreateDTO d, Escuela e) {
		return new EmpleadoEducativo(
				e,
				d.getCuil(),
				d.getNombre(),
				d.getApellido(),
				d.getDomicilio(),
				d.getTelefono(),
				d.getFechaDeNacimiento(),
				d.getFechaDeIngreso(),
				d.getEmail()
		);
	}

	public static EmpleadoEducativo toUpdatedEntity(
			EmpleadoEducativo e,
			EmpleadoEducativoUpdateDTO d
	) {
		return new EmpleadoEducativo(
				e.getEscuela(),
				e.getCuil(),
				d.getNombre() != null ? d.getNombre() : e.getNombre(),
				d.getApellido() != null ? d.getApellido() : e.getApellido(),
				d.getDomicilio() != null ? d.getDomicilio() : e.getDomicilio(),
				d.getTelefono() != null ? d.getTelefono() : e.getTelefono(),
				d.getFechaDeNacimiento() != null ? d.getFechaDeNacimiento() : e.getFechaDeNacimiento(),
				d.getFechaDeIngreso() != null ? d.getFechaDeIngreso() : e.getFechaDeIngreso(),
				d.getEmail() != null ? d.getEmail() : e.getEmail()
		);
	}

}

