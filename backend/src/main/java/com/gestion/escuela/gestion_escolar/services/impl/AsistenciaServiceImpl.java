package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Asistencia;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.EstadoAsistenciaDia;
import com.gestion.escuela.gestion_escolar.models.RolCantidad;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
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

	@Override
	@Transactional(readOnly = true)
	public List<EstadoAsistenciaDia> obtenerEstadoMensual(
			Long escuelaId,
			Long empleadoId,
			YearMonth mes
	) {

		EmpleadoEducativo empleado = empleadoEducativoRepository.findById(empleadoId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("empleado", empleadoId)
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

		List<RolEducativo> rolesFiltro =
				(roles == null || roles.isEmpty()) ? null : roles;

		String queryFiltro =
				(query == null || query.isBlank()) ? null : query;

		return empleadoEducativoRepository.buscarEmpleadosConRolVigente(
				escuelaId,
				fecha,
				rolesFiltro,
				queryFiltro,
				pageable
		);
	}

	@Override
	@Transactional
	public void registrarInasistenciasManuales(
			Long escuelaId,
			EmpleadoEducativo empleado,
			List<LocalDate> fechas,
			TipoLicencia tipoLicencia,
			String observacion
	) {

		if (fechas == null || fechas.isEmpty()) {
			return;
		}

		List<Asistencia> existentes = asistenciaRepository
				.findByEmpleadoEducativoIdAndEscuelaIdAndFechaIn(
						empleado.getId(),
						escuelaId,
						fechas
				);

		Map<LocalDate, Asistencia> existentesPorFecha = existentes.stream()
				.collect(Collectors.toMap(
						Asistencia::getFecha,
						asistencia -> asistencia
				));

		List<Asistencia> aGuardar = new ArrayList<>();

		for (LocalDate fecha : fechas) {

			Asistencia existente = existentesPorFecha.get(fecha);

			if (existente != null) {
				existente.actualizarManual(
						tipoLicencia,
						observacion
				);
				aGuardar.add(existente);

			} else {
				Asistencia a = new Asistencia(empleado, fecha, EstadoAsistencia.AUSENTE, tipoLicencia, observacion);
				aGuardar.add(a);
			}
		}

		asistenciaRepository.saveAll(aGuardar);
	}

	@Override
	public void eliminarInasistenciasManual(
			Long escuelaId,
			Long empleadoId,
			List<LocalDate> fechas) {

		if (fechas == null || fechas.isEmpty()) {
			return;
		}

		List<Asistencia> asistencias = asistenciaRepository.findByEmpleadoEducativoIdAndEscuelaIdAndFechaIn(empleadoId, escuelaId, fechas);

		for (Asistencia asistencia : asistencias) {

			if (asistencia.getEstadoAsistencia() != EstadoAsistencia.AUSENTE) {
				throw new IllegalStateException("No se puede eliminar una asistencia que no sea AUSENTE");
			}
		}
		asistenciaRepository.deleteAll(asistencias);
	}

}

