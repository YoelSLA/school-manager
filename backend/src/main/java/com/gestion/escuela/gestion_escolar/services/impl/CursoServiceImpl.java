package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Curso;
import com.gestion.escuela.gestion_escolar.persistence.CursoRepository;
import com.gestion.escuela.gestion_escolar.services.CursoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class CursoServiceImpl implements CursoService {

	private final CursoRepository cursoRepository;

	@Override
	public Curso buscarPorId(Long id) {
		return cursoRepository.findById(id)
				.orElseThrow(() ->
						new ResponseStatusException(
								HttpStatus.BAD_REQUEST,
								"No existe el curso indicado"
						)
				);
	}
}
