package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.exceptions.EscuelaNoEncontradaException;
import com.gestion.escuela.gestion_escolar.persistence.DesignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import com.gestion.escuela.gestion_escolar.persistence.LicenciaRepository;
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
	private final LicenciaRepository licenciaRepository;
	private final DesignacionRepository designacionRepository;
	private final EmpleadoEducativoRepository empleadoEducativoRepository;

	@Override
	public Escuela crear(Escuela escuela) {
		return escuelaRepository.save(escuela);
	}

	public Escuela obtenerPorId(Long escuelaId) {
		return escuelaRepository.findById(escuelaId).orElseThrow(() -> new EscuelaNoEncontradaException(escuelaId));
	}

	public List<DesignacionAdministrativa> obtenerDesignacionesAdministrativas(Long escuelaId) {
		Escuela escuela = obtenerPorId(escuelaId);
		return designacionRepository.designacionesAdministrativasDeEscuela(escuela.getId());
	}

	@Override
	public List<DesignacionCurso> obtenerDesignacionesCursos(Long escuelaId) {
		Escuela escuela = obtenerPorId(escuelaId);
		return designacionRepository.designacionesCursosDeEscuela(escuela.getId());
	}

	public List<EmpleadoEducativo> listarEmpleadosEducativos(Long escuelaId) {
		Escuela escuela = obtenerPorId(escuelaId);
		return empleadoEducativoRepository.findByEscuelaId(escuela.getId());
	}

	@Override
	public List<Escuela> listarTodas() {
		return escuelaRepository.findAll();
	}

}

