package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.LicenciaNoEncontradaException;
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

	public Licencia obtenerPorId(Long id) {
		return licenciaRepository.findById(id).orElseThrow(() -> new LicenciaNoEncontradaException(id));
	}

	@Override
	public List<Asignacion> obtenerAsignacionesAfectadas(Long licenciaId) {

		Licencia licencia = obtenerPorId(licenciaId);

		return licencia.getEmpleado()
				.getAsignaciones()
				.stream()
				.filter(a -> a.afectadaPor(licencia))
				.toList();
	}

	@Override
	public List<Licencia> buscarPorEscuela(Escuela escuela) {
		return licenciaRepository.findByEscuela(escuela);
	}

}

