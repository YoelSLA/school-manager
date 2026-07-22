package com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.response.LicenciaEstatutariaResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoCerradoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;

public record LicenciaEmpleadoEducativoRowDTO(
    Long id,
    PeriodoCerradoDTO periodo,
    LicenciaEstatutariaResponseDTO licenciaEstatutaria,
    EstadoLicencia estado,
    String descripcion) {}
