package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoEducativoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.empleadoEducativo.EmpleadoNoPerteneceAEscuelaException;
import com.gestion.escuela.gestion_escolar.persistence.*;
import com.gestion.escuela.gestion_escolar.services.EmpleadoEducativoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	private final DesignacionRepository designacionRepository;

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
				.orElseThrow(() -> new RecursoNoEncontradoException("empleado educativo", id));
	}

	@Override
	public Licencia crearLicencia(
			Long empleadoId,
			TipoLicencia tipo,
			Periodo periodo,
			String descripcion,
			Set<Long> designacionIds
	) {

		EmpleadoEducativo empleado = obtenerPorId(empleadoId);

		Set<Designacion> designaciones = new HashSet<>(designacionRepository.findAllById(designacionIds));

		Licencia licencia = empleado.crearLicencia(tipo, periodo, descripcion, designaciones);

		licenciaRepository.save(licencia);

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
	public Page<EmpleadoEducativo> listarPorEscuela(
			Long escuelaId,
			Boolean estado,
			Pageable pageable
	) {

		escuelaRepository.findById(escuelaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("escuela", escuelaId));

		if (estado == null) {
			return empleadoEducativoRepository
					.findByEscuelaId(escuelaId, pageable);
		}

		return empleadoEducativoRepository
				.findByEscuelaIdAndActivo(escuelaId, estado, pageable);
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

		if (periodo.getFechaHasta() == null) {
			throw new IllegalArgumentException(
					"No se pueden calcular días laborables en un período abierto"
			);
		}

		EmpleadoEducativo empleado = obtenerPorId(empleadoId);

		Set<DiaDeSemana> diasQueTrabaja = empleado.diasLaborablesEn(periodo.getFechaDesde());

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
					IllegalArgumentException ignored) {
				// sábado/domingo
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

	@Override
	public Set<Designacion> obtenerDesignacionesActivas(Long empleadoId) {

		EmpleadoEducativo empleado = obtenerPorId(empleadoId);

		return empleado.designacionesActivasEn(LocalDate.now());
	}


}

