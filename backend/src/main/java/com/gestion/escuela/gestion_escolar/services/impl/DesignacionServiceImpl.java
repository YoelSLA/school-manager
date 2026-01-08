package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.persistence.DesignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
import com.gestion.escuela.gestion_escolar.persistence.LicenciaRepository;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional
public class DesignacionServiceImpl implements DesignacionService {

	private final DesignacionRepository designacionRepository;
	private final LicenciaRepository licenciaRepository;
	private final EmpleadoEducativoRepository empleadoEducativoRepository;


	@Override
	public DesignacionAdministrativa crearAdministrativa(DesignacionAdministrativa designacionAdministrativa) {
		return designacionRepository.save(designacionAdministrativa);
	}

	@Override
	public DesignacionCurso crearCurso(DesignacionCurso designacionCurso) {
		return designacionRepository.save(designacionCurso);
	}

	@Override
	public void cubrirDesignacion(Long designacionId, Long empleadoId, LocalDate fechaDesde, LocalDate fechaHasta) {
		Designacion designacion = obtenerPorId(designacionId);
		EmpleadoEducativo empleadoEducativo = empleadoEducativoRepository.findById(empleadoId).orElseThrow(null);

		designacion.cubrirConSuplente(
				empleadoEducativo,
				fechaDesde,
				fechaHasta
		);

		designacionRepository.save(designacion);
	}

	@Override
	public Designacion obtenerPorId(Long id) {
		return designacionRepository.findById(id)
				.orElseThrow(() ->
						new IllegalArgumentException("Designación no encontrada")
				);
	}

	@Override
	public Licencia obtenerLicenciaPorId(Long licenciaId) {
		return licenciaRepository.findById(licenciaId)
				.orElseThrow(() ->
						new IllegalArgumentException("Licencia no encontrada")
				);
	}

	public DesignacionAdministrativa obtenerAdministrativaPorEscuela(
			Long escuelaId,
			Long designacionId
	) {
		Designacion designacion = designacionRepository.findById(designacionId)
				.orElseThrow(() ->
						new EntityNotFoundException(
								"No existe la designación con id " + designacionId
						)
				);

		if (!designacion.getEscuela().getId().equals(escuelaId)) {
			throw new IllegalArgumentException(
					"La designación no pertenece a la escuela indicada"
			);
		}

		if (!(designacion instanceof DesignacionAdministrativa administrativa)) {
			throw new IllegalStateException(
					"La designación no es administrativa"
			);
		}

		return administrativa;
	}

}

