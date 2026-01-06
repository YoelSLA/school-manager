package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;

public class LicenciaMapper {

	public static LicenciaResponseDTO toResponse(Licencia licencia) {

		Asignacion asignacionTitular = licencia.getAsignacion();
		Designacion designacion = asignacionTitular.getDesignacion();

		return new LicenciaResponseDTO(licencia.getId(),
				designacion.getId(),
				EmpleadoEducativoMapper.toMinimo(asignacionTitular.getEmpleadoEducativo()),
				licencia.getFechaDesde(),
				licencia.getFechaHasta(),
				licencia.estaActivaHoy(),
				designacion.tieneSuplentePara(licencia),
				designacion.getCupof(),
				asignacionTitular.getSituacionDeRevista(),
				licencia.getTipoLicencia().getCodigo(),
				licencia.getTipoLicencia().getArticulo(),
				licencia.getTipoLicencia().getDescripcion());
	}
}
