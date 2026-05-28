package com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoCerradoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

public record LicenciaEmpleadoEducativoRowDTO(
		Long id,
		TipoLicencia tipo,
		PeriodoCerradoDTO periodo,
		LicenciaNormativaDTO normativa,
		EstadoLicencia estado,
		String descripcion
) {}
