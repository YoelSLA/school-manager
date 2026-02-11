package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.enums.Turno;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.persistence.CursoRepository;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import com.gestion.escuela.gestion_escolar.services.CursoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CursoServiceImpl implements CursoService {

	private final CursoRepository cursoRepository;
	private final EscuelaRepository escuelaRepository;

	@Override
	public Curso crear(Curso curso, Long escuelaId) {

		Escuela escuela = escuelaRepository.findById(escuelaId).orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		if (cursoRepository.existsByAnioAndGradoAndEscuelaId(
				curso.getAnio(),
				curso.getGrado(),
				escuelaId
		)) {
			throw new RecursoDuplicadoException(
					"curso",
					"año y grado",
					curso.getAnio() + "° / " + curso.getGrado() + "°",
					"la escuela " + escuela.getNombre()
			);
		}

		curso.setEscuela(escuela);

		return cursoRepository.save(curso);
	}

	@Override
	@Transactional
	public void crearBatch(Long escuelaId, List<Curso> cursos) {

		if (cursos == null || cursos.isEmpty()) {
			return;
		}

		Escuela escuela = escuelaRepository.findById(escuelaId).orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		for (Curso curso : cursos) {

			if (cursoRepository.existsByAnioAndGradoAndEscuelaId(
					curso.getAnio(),
					curso.getGrado(),
					escuelaId
			)) {
				throw new RecursoDuplicadoException(
						"curso",
						"año y grado",
						curso.getAnio() + "° / " + curso.getGrado() + "°",
						"la escuela " + escuela.getNombre()
				);
			}

			curso.setEscuela(escuela);
		}

		cursoRepository.saveAll(cursos);
	}

	@Override
	public Curso obtenerPorId(Long id) {
		return cursoRepository.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("curso", id));
	}

	@Override
	public List<Curso> buscarPorEscuela(Long escuelaId, Turno turno) {
		escuelaRepository.findById(escuelaId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("escuela", escuelaId)
				);

		if (turno == null) {
			return cursoRepository.findByEscuelaId(escuelaId);
		}

		return cursoRepository.findByEscuelaIdAndTurno(escuelaId, turno);
	}

	@Override
	public List<Curso> buscarPorEscuela(Long escuelaId) {
		return buscarPorEscuela(escuelaId, null);
	}

}
