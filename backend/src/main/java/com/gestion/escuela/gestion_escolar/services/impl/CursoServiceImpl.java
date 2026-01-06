package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.persistence.CursoRepository;
import com.gestion.escuela.gestion_escolar.services.CursoService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CursoServiceImpl implements CursoService {

	private final CursoRepository cursoRepository;

	@Override
	public Curso obtenerPorId(Long id) {
		return cursoRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException(
						"Curso no encontrado con id " + id
				));
	}

	public Curso crear(Curso curso) {
		if (cursoRepository.existsByAnioAndGradoAndEscuela(curso.getAnio(), curso.getGrado(), curso.getEscuela()
		)) {
			throw new ResponseStatusException(
					HttpStatus.BAD_REQUEST,
					"El curso ya existe en la escuela"
			);
		}

		return cursoRepository.save(curso);
	}

	public List<Curso> buscarPorEscuela(Escuela escuela) {
		return cursoRepository.findByEscuela(escuela);
	}
}
