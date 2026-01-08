package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.*;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResumenDTO;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;

import java.util.List;

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
				e.isActivo()
		);
	}

	public static EmpleadoEducativoDetalleDTO toDetalle(EmpleadoEducativo e) {

		List<AsignacionDetalleDTO> asignaciones = e.getAsignaciones().stream()
				.map(AsignacionMapper::toDetalle)
				.toList();

		List<LicenciaResumenDTO> licencias = e.getLicencias().stream()
				.map(LicenciaMapper::toResumen)
				.toList();

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
				e.isActivo(),
				asignaciones,
				licencias
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
				d.cuil(),
				d.nombre(),
				d.apellido(),
				d.domicilio(),
				d.telefono(),
				d.fechaDeNacimiento(),
				d.fechaDeIngreso(),
				d.email()
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

