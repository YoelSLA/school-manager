package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EscuelaServiceImpl implements EscuelaService {

	private final EscuelaRepository escuelaRepository;

	@Override
	public Escuela crear(Escuela escuela) {
		return escuelaRepository.save(escuela);
	}

	public Escuela obtenerPorId(Long escuelaId) {
		return escuelaRepository.findById(escuelaId).orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));
	}

	@Override
	public List<Escuela> listarTodas() {
		return escuelaRepository.findAll();
	}

}

