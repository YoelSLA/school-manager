package com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.request;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record RenovarLicenciaDTO(
    @NotNull(message = "El tipo de licencia es obligatorio") Long licenciaEstatutariaId,
    @NotNull(message = "La fecha hasta es obligatoria") LocalDate nuevoHasta,
    String descripcion) {}
