package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import com.gestion.escuela.gestion_escolar.persistence.MateriaRepository;
import com.gestion.escuela.gestion_escolar.services.MateriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MateriaServiceImpl implements MateriaService {

	private final MateriaRepository materiaRepository;
	private final EscuelaRepository escuelaRepository;

	@Override
	public Materia crear(Long escuelaId, Materia materia) {

		Escuela escuela = escuelaRepository.findById(escuelaId).orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		if (materiaRepository.existsByNombreIgnoreCaseAndEscuelaId(
				materia.getNombre(),
				escuelaId
		)) {
			throw new RecursoDuplicadoException(
					"materia",
					"nombre",
					materia.getNombre(),
					"la escuela " + escuela.getNombre()
			);
		}

		materia.setEscuela(escuela);
		return materiaRepository.save(materia);
	}

	@Override
	public void crearBatch(Long escuelaId, List<Materia> materias) {

		if (materias == null || materias.isEmpty()) {
			return;
		}

		Escuela escuela = escuelaRepository.findById(escuelaId).orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		for (Materia materia : materias) {

			if (materiaRepository.existsByNombreIgnoreCaseAndEscuelaId(
					materia.getNombre(),
					escuelaId
			)) {
				throw new RecursoDuplicadoException(
						"materia",
						"nombre",
						materia.getNombre(),
						"la escuela " + escuela.getNombre()
				);
			}

			materia.setEscuela(escuela);
		}

		materiaRepository.saveAll(materias);
	}

	@Override
	public Materia obtenerPorId(Long id) {
		return materiaRepository.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("materia", id));
	}

	@Override
	public Page<Materia> buscarPorEscuela(
			Long escuelaId,
			Pageable pageable
	) {

		escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		return materiaRepository.findByEscuelaId(
				escuelaId,
				pageable
		);
	}

	@Override
	public List<Materia> buscarNombresPorEscuela(Long escuelaId) {

		escuelaRepository.findById(escuelaId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("escuela", escuelaId)
				);

		return materiaRepository
				.findByEscuelaIdOrderByNombreAsc(escuelaId);
	}


}
