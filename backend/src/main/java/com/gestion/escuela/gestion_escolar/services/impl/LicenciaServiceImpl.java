package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import com.gestion.escuela.gestion_escolar.persistence.LicenciaRepository;
import com.gestion.escuela.gestion_escolar.services.LicenciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class LicenciaServiceImpl implements LicenciaService {

	private final LicenciaRepository licenciaRepository;
	private final EscuelaRepository escuelaRepository;

	public Licencia obtenerPorId(Long id) {
		return licenciaRepository.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("licencia", id));
	}

	@Override
	public Page<Licencia> buscarPorEscuela(
			Long escuelaId,
			Pageable pageable
	) {
		escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		return licenciaRepository.buscarRaicesPorEscuelaId(
				escuelaId,
				pageable
		);
	}

	@Override
	public Licencia renovarLicencia(
			Long licenciaId,
			TipoLicencia nuevoTipo,
			LocalDate nuevoHasta,
			String descripcion
	) {

		Licencia original = obtenerPorId(licenciaId);

		Licencia renovada = original.renovar(
				nuevoTipo,
				nuevoHasta,
				descripcion
		);

		return licenciaRepository.save(renovada);
	}

	@Override
	public Set<Designacion> obtenerDesignacionesAfectadas(Long licenciaId) {

		Licencia licencia = obtenerPorId(licenciaId);

		return licencia.getDesignaciones();

	}

	@Override
	public List<Licencia> obtenerTimeline(Long licenciaId) {

		Licencia licencia = obtenerPorId(licenciaId);

		return licencia.cadenaCompleta();
	}


}

