package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoEducativoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoNoPerteneceAEscuelaException;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EmpleadoEducativoServiceImpl implements EmpleadoEducativoService {

	private final EmpleadoEducativoRepository empleadoEducativoRepository;

	@Override
	public Licencia crearLicencia(
			Long empleadoId,
			TipoLicencia tipo,
			LocalDate desde,
			LocalDate hasta,
			String descripcion
	) {
		EmpleadoEducativo empleado = obtenerPorId(empleadoId);
		return empleado.crearLicencia(tipo, desde, hasta, descripcion);
	}

	@Override
	public EmpleadoEducativo obtenerPorEscuela(Long escuelaId, Long empleadoId) {
		EmpleadoEducativo empleado = obtenerPorId(empleadoId);

		if (!empleado.getEscuela().getId().equals(escuelaId)) {
			throw new EmpleadoNoPerteneceAEscuelaException(empleadoId, escuelaId);
		}

		return empleado;
	}


	@Override
	public EmpleadoEducativo crear(EmpleadoEducativo empleado) {

		if (empleadoEducativoRepository.existsByCuilAndEscuela(
				empleado.getCuil(),
				empleado.getEscuela()
		)) {
			throw new EmpleadoEducativoDuplicadoException(
					"CUIL",
					empleado.getCuil(),
					empleado.getEscuela().getNombre()
			);
		}

		if (empleadoEducativoRepository.existsByEmailAndEscuela(
				empleado.getEmail(),
				empleado.getEscuela()
		)) {
			throw new EmpleadoEducativoDuplicadoException(
					"email",
					empleado.getEmail(),
					empleado.getEscuela().getNombre()
			);
		}

		return empleadoEducativoRepository.save(empleado);
	}

	@Override
	public EmpleadoEducativo obtenerPorId(Long id) {
		return empleadoEducativoRepository.findById(id)
				.orElseThrow(() ->
						new IllegalArgumentException("Empleado no encontrado")
				);
	}

	public List<EmpleadoEducativo> buscarPorEscuela(Long escuelaId, String search) {


		return empleadoEducativoRepository.buscarPorEscuelaYTexto(escuelaId, search.toLowerCase());
	}

	@Override
	public List<Asignacion> obtenerAsignacionesActivas(Long empleadoId) {
		EmpleadoEducativo empleado = obtenerPorId(empleadoId);

		return empleado.asignacionesActivas(LocalDate.now());
	}


}

