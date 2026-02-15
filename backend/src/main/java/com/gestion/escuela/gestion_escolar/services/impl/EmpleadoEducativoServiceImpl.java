package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoEducativoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoNoPerteneceAEscuelaException;
import com.gestion.escuela.gestion_escolar.persistence.AsignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
import com.gestion.escuela.gestion_escolar.persistence.EscuelaRepository;
import com.gestion.escuela.gestion_escolar.persistence.LicenciaRepository;
import com.gestion.escuela.gestion_escolar.services.AsistenciaService;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class EmpleadoEducativoServiceImpl implements EmpleadoEducativoService {

	private final EmpleadoEducativoRepository empleadoEducativoRepository;
	private final LicenciaRepository licenciaRepository;
	private final EscuelaRepository escuelaRepository;
	private final AsignacionRepository asignacionRepository;
	private final AsistenciaService asistenciaService;

	@Override
	public EmpleadoEducativo crear(Long escuelaId, EmpleadoEducativo empleado) {

		Escuela escuela = escuelaRepository.findById(escuelaId).orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		if (empleadoEducativoRepository.existsByCuilAndEscuelaId(
				empleado.getCuil(),
				escuelaId
		)) {
			throw new EmpleadoEducativoDuplicadoException(
					"CUIL",
					empleado.getCuil(),
					escuela.getNombre()
			);
		}

		if (empleadoEducativoRepository.existsByEmailAndEscuelaId(
				empleado.getEmail(),
				escuelaId
		)) {
			throw new EmpleadoEducativoDuplicadoException(
					"email",
					empleado.getEmail(),
					escuela.getNombre()
			);
		}

		empleado.setEscuela(escuela);

		return empleadoEducativoRepository.save(empleado);
	}

	@Override
	public void crearBatch(List<EmpleadoEducativo> empleadoEducativos) {
		empleadoEducativoRepository.saveAll(empleadoEducativos);
	}

	@Override
	public EmpleadoEducativo obtenerPorId(Long id) {
		return empleadoEducativoRepository.findById(id)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("empleado educativo", id)
				);
	}

	@Override
	@Transactional
	public Licencia crearLicencia(
			Long empleadoId,
			TipoLicencia tipo,
			Periodo periodo,
			String descripcion
	) {
		EmpleadoEducativo empleado = obtenerPorId(empleadoId);

		Licencia licencia = empleado.crearLicencia(tipo, periodo, descripcion);
		licencia.inicializarDesignacionesAfectadas();

		licenciaRepository.save(licencia);

		asistenciaService.impactarLicencia(licencia);

		return licencia;
	}


	@Override
	public void darDeBajaDefinitiva(
			Long empleadoId,
			LocalDate fechaBaja,
			CausaBaja causa
	) {
		EmpleadoEducativo empleado = obtenerPorId(empleadoId);

		empleado.darDeBajaDefinitiva(causa, fechaBaja);

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
	public List<EmpleadoEducativo> listarPorEscuela(Long escuelaId, Boolean estado) {

		escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		if (estado == null) {
			return empleadoEducativoRepository.findByEscuelaId(escuelaId);
		}

		return empleadoEducativoRepository.findByEscuelaIdAndActivo(escuelaId, estado);
	}


	@Override
	public List<EmpleadoEducativo> buscarPorEscuela(Long escuelaId, String search) {

		return empleadoEducativoRepository.buscarPorEscuelaYTexto(escuelaId, search.toLowerCase());
	}

	public Set<RolEducativo> obtenerRolesEducativos(Long empleadoId) {
		return asignacionRepository.obtenerRolesVigentesEnFecha(empleadoId, LocalDate.now());
	}

	@Override
	public Set<LocalDate> diasLaborablesEnPeriodo(
			Long escuelaId,
			Long empleadoId,
			Periodo periodo
	) {
		EmpleadoEducativo empleado = obtenerPorId(empleadoId);

		// 📘 Regla de dominio: qué días trabaja (en ESTA escuela)
		Set<DiaDeSemana> diasQueTrabaja = empleado.diasQueTrabajaEnEscuela(escuelaId);

		Set<LocalDate> fechasEnQueTrabaja = new HashSet<>();

		for (LocalDate fecha = periodo.getFechaDesde();
			 !fecha.isAfter(periodo.getFechaHasta());
			 fecha = fecha.plusDays(1)) {

			try {
				DiaDeSemana dia = DiaDeSemana.from(fecha);

				if (diasQueTrabaja.contains(dia)) {
					fechasEnQueTrabaja.add(fecha);
				}

			} catch (
					IllegalArgumentException e) {
				// sábado o domingo → se ignora
			}
		}

		return fechasEnQueTrabaja;
	}

	@Override
	public EmpleadoEducativo actualizar(EmpleadoEducativo empleado) {

		Long escuelaId = empleado.getEscuela().getId();
		Long empleadoId = empleado.getId();
		Escuela escuela = empleado.getEscuela();

		if (empleadoEducativoRepository.existsByCuilAndEscuelaIdAndIdNot(
				empleado.getCuil(),
				escuelaId,
				empleadoId
		)) {
			throw new EmpleadoEducativoDuplicadoException(
					"CUIL",
					empleado.getCuil(),
					escuela.getNombre()
			);
		}

		if (empleadoEducativoRepository.existsByEmailAndEscuelaIdAndIdNot(
				empleado.getEmail(),
				escuelaId,
				empleadoId
		)) {
			throw new EmpleadoEducativoDuplicadoException(
					"email",
					empleado.getEmail(),
					escuela.getNombre()
			);
		}

		return empleado;
	}


}

