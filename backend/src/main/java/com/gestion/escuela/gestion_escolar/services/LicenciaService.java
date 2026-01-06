package com.gestion.escuela.gestion_escolar.services;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResponseDTO;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;

import java.util.List;

public interface LicenciaService {

	List<LicenciaResponseDTO> listarPorDesignacion(Designacion designacion);

	List<LicenciaResponseDTO> listarTodas();
}

