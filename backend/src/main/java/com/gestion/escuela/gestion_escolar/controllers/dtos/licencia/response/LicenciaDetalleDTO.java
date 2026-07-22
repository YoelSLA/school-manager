package com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.EmpleadoEducativoBasicoDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.response.LicenciaEstatutariaResponseDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.periodo.response.PeriodoCerradoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoLicencia;

public record LicenciaDetalleDTO(
    Long id,
    EmpleadoEducativoBasicoDTO empleado,
    LicenciaEstatutariaResponseDTO licenciaEstatutaria,
    String descripcion,
    PeriodoCerradoDTO periodo,
    EstadoLicencia estadoLicencia) {}
