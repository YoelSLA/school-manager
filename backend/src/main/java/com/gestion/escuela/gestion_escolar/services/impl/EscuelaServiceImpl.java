package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.exceptions.EscuelaNoEncontradaException;
import com.gestion.escuela.gestion_escolar.persistence.DesignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import com.gestion.escuela.gestion_escolar.persistence.LicenciaRepository;
import com.gestion.escuela.gestion_escolar.services.EscuelaService;
import jakarta.persistence.EntityNotFoundException;
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
		return escuelaRepository.findById(escuelaId)
				.orElseThrow(() ->
						new EscuelaNoEncontradaException(escuelaId)
				);
	}

	public List<DesignacionAdministrativa> obtenerDesignacionesAdministrativas(Long escuelaId) {
		if (!escuelaRepository.existsById(escuelaId)) {
			throw new EntityNotFoundException(
					"No existe la escuela con id " + escuelaId
			);
		}

		return designacionRepository.designacionesAdministrativasDeEscuela(escuelaId);
	}

	@Override
	public List<DesignacionCurso> obtenerDesignacionesCursos(Long escuelaId) {
		if (!escuelaRepository.existsById(escuelaId)) {
			throw new EntityNotFoundException("No existe la escuela con id " + escuelaId);
		}

		return designacionRepository.designacionesCursosDeEscuela(escuelaId);
	}

	public List<EmpleadoEducativo> listarEmpleadosEducativos(Long escuelaId
	) {
		if (!escuelaRepository.existsById(escuelaId)) {
			throw new EntityNotFoundException("No existe la escuela con id " + escuelaId);
		}

		return empleadoEducativoRepository.findByEscuelaId(escuelaId);
	}

	public List<Licencia> obtenerLicencias(Long escuelaId) {

		if (!escuelaRepository.existsById(escuelaId)) {
			throw new EntityNotFoundException(
					"No existe la escuela con id " + escuelaId
			);
		}

		return licenciaRepository.licenciasDeEscuela(escuelaId);
	}

	public Escuela guardar(Escuela escuela) {
		return escuelaRepository.save(escuela);
	}


	@Override
	public void desactivarPorNombre(String nombre) {

	}

	@Override
	public void activarPorNombre(String nombre) {

	}


	@Override
	public Escuela obtenerPorNombre(String nombre) {
		return null;
	}

	@Override
	public Escuela actualizarPorNombre(String nombreActual, Escuela datosActualizados) {
		return null;
	}

	@Override
	public List<Escuela> listarTodas() {
		return escuelaRepository.findAll();
	}

	@Override
	public List<Escuela> listarActivas() {
		return escuelaRepository.findAllByActivaTrue();
	}


//	private final EscuelaRepository escuelaRepository;
//
//	public Escuela crear(Escuela escuelaACrear) {
//
//		if (escuelaRepository.existsByNombreIgnoreCase(escuelaACrear.getNombre())) {
//			throw new EscuelaDuplicadaException(escuelaACrear.getNombre());
//		}
//		return escuelaRepository.save(escuelaACrear);
//	}
//
//	public Escuela obtenerPorNombre(String nombre) {
//
//		return escuelaRepository.findByNombreIgnoreCaseAndActivaTrue(nombre)
//				.orElseThrow(() -> new EscuelaNoEncontradaException(nombre));
//
//	}
//

//	@Override
//	public void desactivarPorNombre(String nombre) {
//
//		Escuela escuela = obtenerPorNombre(nombre);
//		escuela.desactivar();
//	}
//
//	@Override
//	public Escuela actualizarPorNombre(String nombreActual, Escuela datos) {
//
//		Escuela escuela = escuelaRepository
//				.findByNombreIgnoreCaseAndActivaTrue(nombreActual)
//				.orElseThrow(() -> new EscuelaNoEncontradaException(nombreActual));
//
//		if (!escuela.getNombre().equalsIgnoreCase(datos.getNombre()) && escuelaRepository.existsByNombreIgnoreCase(datos.getNombre())) {
//			throw new EscuelaDuplicadaException(datos.getNombre());
//		}
//
//		escuela.setNombre(datos.getNombre());
//		escuela.setDireccion(datos.getDireccion());
//		escuela.setTelefono(datos.getTelefono());
//
//		return escuela;
//	}
//
//	@Override
//	public void activarPorNombre(String nombre) {
//
//		Escuela escuela = escuelaRepository.findByNombreIgnoreCase(nombre).orElseThrow(() -> new EscuelaNoEncontradaException(nombre));
//
//		escuela.activar();
//	}


}

