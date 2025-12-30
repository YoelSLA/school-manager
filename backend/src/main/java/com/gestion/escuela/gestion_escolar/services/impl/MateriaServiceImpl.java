package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.persistence.MateriaRepository;
import com.gestion.escuela.gestion_escolar.services.MateriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class MateriaServiceImpl implements MateriaService {

	private final MateriaRepository materiaRepository;

	@Override
	public Materia buscarPorId(Long id) {
		return materiaRepository.findById(id)
				.orElseThrow(() ->
						new ResponseStatusException(
								HttpStatus.BAD_REQUEST,
								"No existe la materia indicada"
						)
				);
	}
}
