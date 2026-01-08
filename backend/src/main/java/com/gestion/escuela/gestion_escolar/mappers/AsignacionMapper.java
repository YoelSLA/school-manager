package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionAfectadaPorLicenciaDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones.AsignacionDetalleDTO;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;

import java.time.LocalDate;

public class AsignacionMapper {

	// Entidad -> ResponseDTO
	public static AsignacionDetalleDTO toDetalle(Asignacion a) {
		return new AsignacionDetalleDTO(
				a.getId(),
				EmpleadoEducativoMapper.toMinimo(a.getEmpleadoEducativo()),
				a.getFechaTomaPosesion(),
				a.getFechaCese(),
				a.getSituacionDeRevista(),
				a.getFechaBaja(),
				a.getCausaBaja(),
				a.estaDisponibleEn(LocalDate.now())
		);
	}

	public static AsignacionAfectadaPorLicenciaDTO toAfectadaPorLicencia(Asignacion a, Licencia l) {

		return new AsignacionAfectadaPorLicenciaDTO(
				a.getId(),
				DesignacionMapper.toMinima(a.getDesignacion()),
				a.getSituacionDeRevista(),
				a.getFechaTomaPosesion(),
				a.getFechaCese(),
				a.getFechaBaja(),
				a.getCausaBaja(),
				a.afectadaPor(l));
	}
}

