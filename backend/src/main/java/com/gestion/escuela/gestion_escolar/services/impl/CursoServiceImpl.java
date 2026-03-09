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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	public Curso crear(Long escuelaId, Curso curso) {

		Escuela escuela = escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		validarNoDuplicado(
				escuelaId,
				curso.getAnio(),
				curso.getGrado(),
				curso.getTurno(),
				escuela.getNombre()
		);

		escuela.agregarCurso(curso);

		return cursoRepository.save(curso);
	}

	@Override
	public void crearBatch(Long escuelaId, List<Curso> cursos) {

		if (cursos == null || cursos.isEmpty()) {
			return;
		}

		Escuela escuela = escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		for (Curso curso : cursos) {
			validarNoDuplicado(
					escuelaId,
					curso.getAnio(),
					curso.getGrado(),
					curso.getTurno(),
					escuela.getNombre()
			);
			escuela.agregarCurso(curso);
		}

		cursoRepository.saveAll(cursos);
	}

	@Override
	public Curso obtenerPorId(Long id) {
		return cursoRepository.findById(id).orElseThrow(() -> new RecursoNoEncontradoException("curso", id));
	}

	@Override
	public Page<Curso> listarCursosPorEscuela(
			Long escuelaId,
			Turno turno,
			Pageable pageable
	) {

		escuelaRepository.findById(escuelaId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("escuela", escuelaId)
				);

		if (turno == null) {
			return cursoRepository.findByEscuelaId(escuelaId, pageable);
		}

		return cursoRepository.findByEscuelaIdAndTurno(escuelaId, turno, pageable);

	}

	@Override
	public List<Curso> listarCursosPorEscuela(Long escuelaId) {

		escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		return cursoRepository.findByEscuelaId(escuelaId);

	}

	public void eliminar(Long escuelaId, Long cursoId) {

		Escuela escuela = escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		Curso curso = cursoRepository
				.findByIdAndEscuelaId(cursoId, escuelaId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("curso", cursoId)
				);

		escuela.removerCurso(curso);

		cursoRepository.delete(curso);

	}

	@Override
	public Curso actualizar(Long escuelaId, Long cursoId, Integer anio, Integer grado, Turno turno) {

		Escuela escuela = escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		Curso curso = cursoRepository.findByIdAndEscuelaId(cursoId, escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("curso", cursoId));

		if (cursoRepository.existsByEscuelaIdAndAnioAndGradoAndTurnoAndIdNot(
				escuelaId,
				anio,
				grado,
				turno,
				cursoId
		)) {
			throw new RecursoDuplicadoException(
					String.format(
							"Ya existe un curso %s° %s - turno %s en la escuela %s",
							anio,
							grado,
							turno,
							escuela.getNombre()
					)
			);
		}

		curso.actualizar(turno, anio, grado);

		return cursoRepository.save(curso);
	}

	private void validarNoDuplicado(
			Long escuelaId,
			Integer anio,
			Integer grado,
			Turno turno,
			String nombreEscuela
	) {
		if (cursoRepository.existsByEscuelaIdAndAnioAndGradoAndTurno(
				escuelaId, anio, grado, turno
		)) {
			throw new RecursoDuplicadoException(
					String.format(
							"Ya existe un curso %s° %s - turno %s en la escuela %s",
							anio,
							grado,
							turno,
							nombreEscuela
					)
			);
		}
	}


}
