package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Asistencia;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.EstadoAsistenciaDia;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.AsistenciaNoEditableException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.models.records.EmpleadoAsistenciaResumen;
import com.gestion.escuela.gestion_escolar.models.records.RolCantidad;
import com.gestion.escuela.gestion_escolar.persistence.AsignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.AsistenciaRepository;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
import com.gestion.escuela.gestion_escolar.persistence.RolCantidadProjection;
import com.gestion.escuela.gestion_escolar.services.AsistenciaService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class AsistenciaServiceImpl implements AsistenciaService {

	private final AsistenciaRepository asistenciaRepository;
	private final AsignacionRepository asignacionRepository;
	private final EmpleadoEducativoRepository empleadoEducativoRepository;

	@Transactional
	@Override
	public void registrarInasistencia(
			Long escuelaId,
			Long empleadoId,
			LocalDate fecha,
			TipoLicencia tipoLicencia,
			String observacion
	) {

		EmpleadoEducativo empleadoEducativo = empleadoEducativoRepository.findById(empleadoId)
				.orElseThrow(() -> new RecursoNoEncontradoException("empleadoEducativoBasico educativo", empleadoId));

		Optional<Asistencia> asistenciaExistente = asistenciaRepository
						.findByEmpleadoEducativoIdAndEscuelaIdAndFecha(
								empleadoEducativo.getId(),
								escuelaId,
								fecha
						);

		Asistencia asistencia;

		if (asistenciaExistente.isPresent()) {
			asistencia = asistenciaExistente.get();
			asistencia.actualizarManual(tipoLicencia, observacion);
		} else {
			asistencia = new Asistencia(
					empleadoEducativo,
					fecha,
					EstadoAsistencia.AUSENTE,
					tipoLicencia,
					observacion
			);
		}
		asistenciaRepository.save(asistencia);
	}

	@Transactional
	@Override
	public void registrarInasistencias(
			Long escuelaId,
			EmpleadoEducativo empleado,
			List<LocalDate> fechas,
			TipoLicencia tipoLicencia,
			String observacion
	) {

		if (fechas == null || fechas.isEmpty()) {
			return;
		}

		for (LocalDate fecha : fechas) {
			registrarInasistencia(
					escuelaId,
					empleado.getId(),
					fecha,
					tipoLicencia,
					observacion
			);
		}
	}

	@Transactional(readOnly = true)
	@Override
	public List<Asistencia> obtenerAsistenciasDelMes(
			Long escuelaId,
			Long empleadoId,
			YearMonth mes
	) {

		LocalDate inicio = mes.atDay(1);
		LocalDate fin = mes.atEndOfMonth();

		return asistenciaRepository.findByEmpleadoEducativoIdAndEscuelaIdAndFechaBetween(
				empleadoId,
				escuelaId,
				inicio,
				fin
		);
	}

	@Transactional(readOnly = true)
	@Override
	public List<EstadoAsistenciaDia> obtenerEstadoAsistenciaMensual(
			Long escuelaId,
			Long empleadoId,
			YearMonth mes
	) {

		EmpleadoEducativo empleado = empleadoEducativoRepository.findById(empleadoId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("empleadoEducativoBasico", empleadoId)
				);

		LocalDate inicio = mes.atDay(1);
		LocalDate fin = mes.atEndOfMonth();

		Map<LocalDate, Asistencia> manualesPorFecha = asistenciaRepository
				.findByEmpleadoEducativoIdAndEscuelaIdAndFechaBetween(
						empleadoId,
						escuelaId,
						inicio,
						fin
				)
				.stream()
				.collect(Collectors.toMap(
						Asistencia::getFecha,
						asistencia -> asistencia
				));

		return empleado.diasQueDebeAsistir(mes)
				.stream()
				.map(fecha -> empleado.estadoAsistenciaEn(
						fecha,
						manualesPorFecha
				))
				.toList();
	}

	@Override
	@Transactional(readOnly = true)
	public List<RolCantidad> contarEmpleadosPorRolVigente(
			Long escuelaId,
			LocalDate fecha
	) {

		List<RolCantidadProjection> conteos =
				asignacionRepository.contarEmpleadosPorRolVigente(
						escuelaId,
						fecha
				);

		Map<RolEducativo, Integer> conteo = new EnumMap<>(RolEducativo.class);

		conteos.forEach(p ->
				conteo.put(
						p.getRol(),
						p.getCantidad().intValue()
				)
		);

		return Arrays.stream(RolEducativo.values())
				.map(rol -> new RolCantidad(
						rol,
						conteo.getOrDefault(rol, 0)
				))
				.sorted(Comparator.comparing(rc -> rc.rol().getLabel()))
				.toList();
	}

	@Override
	public Page<EmpleadoEducativo> buscarEmpleados(
			Long escuelaId,
			LocalDate fecha,
			List<RolEducativo> roles,
			String query,
			Pageable pageable
	) {

		List<RolEducativo> rolesFiltro = (roles == null || roles.isEmpty()) ? null : roles;

		String queryFiltro = (query == null || query.isBlank()) ? null : query;

		return empleadoEducativoRepository.buscarEmpleadosConRolVigente(
				escuelaId,
				fecha,
				rolesFiltro,
				queryFiltro,
				pageable
		);
	}

	@Override
	public void eliminarInasistencia(
			Long escuelaId,
			Long empleadoId,
			LocalDate fecha
	) {

		Asistencia asistencia =
				asistenciaRepository.findByEmpleadoEducativoIdAndEscuelaIdAndFecha(empleadoId, escuelaId, fecha)
				.orElseThrow(() -> new RecursoNoEncontradoException("inasistencia", fecha));

		if (asistencia.getEstadoAsistencia() != EstadoAsistencia.AUSENTE) {
			throw new AsistenciaNoEditableException(fecha);
		}

		asistenciaRepository.delete(asistencia);
	}

	@Override
	public void eliminarInasistencias(Long escuelaId, Long empleadoId, List<LocalDate> fechas) {

		if (fechas == null || fechas.isEmpty()) {
			return;
		}

		for (LocalDate fecha : fechas) {
			this.eliminarInasistencia(escuelaId, empleadoId, fecha
			);
		}
	}

	@Override
	public EmpleadoAsistenciaResumen getResumenAsistenciaEmpleado(
			EmpleadoEducativo empleado,
			LocalDate fecha
	) {

		LocalDate desde = fecha.withDayOfMonth(1);
		LocalDate hasta = fecha.withDayOfMonth(fecha.lengthOfMonth());

		int faltasUltimoMes =
				(int) asistenciaRepository
						.countByEmpleadoEducativoIdAndFechaBetweenAndEstadoAsistenciaIn(
								empleado.getId(),
								desde,
								hasta,
								List.of(EstadoAsistencia.AUSENTE)
						);

		TipoLicencia licenciaMasFrecuente =
				asistenciaRepository
						.findTipoLicenciaMasFrecuenteDelMes(
								empleado.getId(),
								desde,
								hasta
						)
						.orElse(null);

		return new EmpleadoAsistenciaResumen(
				empleado.rolesActivosEn(fecha),
				faltasUltimoMes,
				licenciaMasFrecuente
		);
	}

}

