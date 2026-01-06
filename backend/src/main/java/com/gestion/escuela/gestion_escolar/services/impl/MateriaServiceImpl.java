package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Materia;
import com.gestion.escuela.gestion_escolar.persistence.MateriaRepository;
import com.gestion.escuela.gestion_escolar.services.MateriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MateriaServiceImpl implements MateriaService {

	private final MateriaRepository materiaRepository;

	@Override
	public Materia obtenerPorId(Long id) {
		return materiaRepository.findById(id)
				.orElseThrow(() ->
						new ResponseStatusException(
								HttpStatus.BAD_REQUEST,
								"No existe la materia indicada"
						)
				);
	}

	public Materia crear(Materia materia) {
		if (materiaRepository.existsByNombreIgnoreCaseAndEscuela(materia.getNombre(), materia.getEscuela())) {
			throw new ResponseStatusException(
					HttpStatus.BAD_REQUEST,
					"Ya existe una materia con ese nombre en la escuela");
		}
		return materiaRepository.save(materia);
	}

	public List<Materia> buscarPorEscuela(Escuela escuela) {
		return materiaRepository.findByEscuela(escuela);
	}


}
