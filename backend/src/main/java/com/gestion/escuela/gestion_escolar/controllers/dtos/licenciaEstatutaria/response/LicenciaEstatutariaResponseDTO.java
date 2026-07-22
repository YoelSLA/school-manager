package com.gestion.escuela.gestion_escolar.controllers.dtos.licenciaEstatutaria.response;

public record LicenciaEstatutariaResponseDTO(
    Long id, String articulo, String codigo, String nombre, String descripcion, boolean activa) {}
