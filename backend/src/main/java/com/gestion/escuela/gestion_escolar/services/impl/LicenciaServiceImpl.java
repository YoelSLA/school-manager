package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaResponseDTO;
import com.gestion.escuela.gestion_escolar.mappers.LicenciaMapper;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.persistence.LicenciaRepository;
import com.gestion.escuela.gestion_escolar.services.LicenciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LicenciaServiceImpl implements LicenciaService {

	private final LicenciaRepository licenciaRepository;

	@Override
	public List<LicenciaResponseDTO> listarPorDesignacion(Designacion designacion) {

		if (designacion == null) {
			throw new IllegalArgumentException("La designación es obligatoria");
		}

		return designacion.getAsignaciones().stream()
				.flatMap(a -> a.getLicencias().stream())
				.map(LicenciaMapper::toResponse)
				.toList();
	}

	@Override
	public List<LicenciaResponseDTO> listarTodas() {

		return licenciaRepository.findAll().stream()
				.map(LicenciaMapper::toResponse)
				.toList();
	}
}

