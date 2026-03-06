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

@RequiredArgsConstructor
@Service
@Transactional
public class MateriaServiceImpl implements MateriaService {

	private final MateriaRepository materiaRepository;
	private final EscuelaRepository escuelaRepository;

	@Override
	public Materia crear(Long escuelaId, Materia materia) {

		Escuela escuela = escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		validarNombreUnico(
				escuelaId,
				materia.getNombre(),
				escuela.getNombre()
		);

		escuela.agregarMateria(materia);

		return materiaRepository.save(materia);
	}

	@Override
	public void crearBatch(Long escuelaId, List<Materia> materias) {

		if (materias == null || materias.isEmpty()) {
			return;
		}

		Escuela escuela = escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		for (Materia materia : materias) {

			validarNombreUnico(
					escuelaId,
					materia.getNombre(),
					escuela.getNombre()
			);

			escuela.agregarMateria(materia);
		}

		materiaRepository.saveAll(materias);
	}

	@Override
	public Materia obtenerPorId(Long id) {
		return materiaRepository.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("materia", id));
	}

	@Override
	public Page<Materia> listarMateriasPorEscuela(Long escuelaId, Pageable pageable) {

		escuelaRepository.findById(escuelaId).orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		return materiaRepository.findByEscuelaIdOrderByNombreAsc(escuelaId, pageable);
	}

	@Override
	public List<Materia> listarMateriasPorEscuela(Long escuelaId) {

		escuelaRepository.findById(escuelaId).orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		return materiaRepository.findByEscuelaIdOrderByNombreAsc(escuelaId);
	}

	public void eliminar(Long escuelaId, Long materiaId) {

		Escuela escuela = escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		Materia materia = materiaRepository
				.findByIdAndEscuelaId(materiaId, escuelaId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("materia", materiaId)
				);

		escuela.removerMateria(materia);

		materiaRepository.delete(materia);
	}

	@Override
	public Materia actualizar(Long escuelaId,
							  Long materiaId,
							  String nombre,
							  String abreviatura,
							  Integer cantidadModulos) {

		Materia materia = materiaRepository
				.findByIdAndEscuelaId(materiaId, escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("materia", materiaId));

		if (materiaRepository.existsByEscuelaIdAndNombreIgnoreCaseAndIdNot(
				escuelaId,
				nombre,
				materiaId
		)) {
			throw new RecursoDuplicadoException(
					"materia",
					"nombre",
					nombre,
					"la escuela " + materia.getEscuela().getNombre()
			);
		}

		materia.actualizar(nombre, abreviatura, cantidadModulos);

		return materiaRepository.save(materia);
	}

	private void validarNombreUnico(
			Long escuelaId,
			String nombre,
			String nombreEscuela
	) {
		if (materiaRepository.existsByNombreIgnoreCaseAndEscuelaId(
				nombre,
				escuelaId
		)) {
			throw new RecursoDuplicadoException(
					"materia",
					"nombre",
					nombre,
					"la escuela " + nombreEscuela
			);
		}
	}


}
