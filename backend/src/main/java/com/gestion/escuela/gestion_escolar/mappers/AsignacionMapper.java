package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleResponseDTO;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;

import java.time.LocalDate;

public class AsignacionMapper {

	// Entidad -> ResponseDTO
	public static AsignacionDetalleResponseDTO toResponse(Asignacion a) {

		EmpleadoEducativo e = a.getEmpleadoEducativo();
		LocalDate hoy = LocalDate.now();
		boolean vigente = a.estaVigenteEn(hoy);
		boolean enLicencia = a.estaEnLicenciaEn(hoy);
		boolean cubierta = enLicencia && a.getDesignacion().asignacionQueEjerceEn(hoy).isPresent();

		return new AsignacionDetalleResponseDTO(
				a.getId(),
				a.getFechaTomaPosesion(),
				a.getFechaCese(),
				a.getSituacionDeRevista(),
				EmpleadoEducativoMapper.toMinimo(e),
				vigente,
				enLicencia,
				cubierta);
	}
}

