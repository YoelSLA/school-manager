package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.persistence.AsignacionRepository;
import com.gestion.escuela.gestion_escolar.services.AsignacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AsignacionServiceImpl implements AsignacionService {

	private final AsignacionRepository asignacionRepository;

	@Override
	public Asignacion crear(Asignacion asignacion) {
		return asignacionRepository.save(asignacion);
	}
}