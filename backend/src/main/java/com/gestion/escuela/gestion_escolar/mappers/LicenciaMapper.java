package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResumenDTO;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

import java.time.LocalDate;

public class LicenciaMapper {

	public static LicenciaResumenDTO toResumen(Licencia l) {
		TipoLicencia tipo = l.getTipoLicencia();

		return new LicenciaResumenDTO(
				l.getId(),
				EmpleadoEducativoMapper.toMinimo(l.getEmpleado()),
				tipo.getCodigo(),
				tipo.getArticulo(),
				tipo.getDescripcion(),
				l.getFechaDesde(),
				l.getFechaHasta(),
				l.aplicaEn(LocalDate.now())
		);
	}

	public static LicenciaDetalleDTO toDetalle(Licencia l) {
		TipoLicencia tipo = l.getTipoLicencia();

		return new LicenciaDetalleDTO(
				l.getId(),
				EmpleadoEducativoMapper.toMinimo(l.getEmpleado()),
				tipo.getCodigo(),
				tipo.getArticulo(),
				tipo.getDescripcion(),
				l.getDescripcion(),
				l.getFechaDesde(),
				l.getFechaHasta(),
				l.aplicaEn(LocalDate.now())
		);
	}

}
