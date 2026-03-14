package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.persistence.AsignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.AsistenciaRepository;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
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
	public List<Asistencia> asistenciasDe(Long empleadoId) {
		return asistenciaRepository.findByEmpleadoEducativoId(empleadoId);
	}

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

		List<Asistencia> manuales = asistenciaRepository
				.findByEmpleadoEducativoIdAndEscuelaIdAndFechaBetween(
						escuelaId,
						empleadoId,
						inicio,
						fin
				);

		Map<LocalDate, Asistencia> manualesPorFecha =
				manuales.stream()
						.collect(Collectors.toMap(
								Asistencia::getFecha,
								a -> a
						));

		List<LocalDate> fechasQueDebeAsistir = diasQueDebeAsistir(empleado, mes);

		return fechasQueDebeAsistir
				.stream()
				.map(f -> construirEstadoDia(empleado, f, manualesPorFecha))
				.toList();
	}

	@Override
	@Transactional(readOnly = true)
	public List<RolCantidad> contarEmpleadosPorRolVigente(LocalDate fecha) {

		var raw = asignacionRepository.contarEmpleadosPorRolVigente(fecha);

		// EnumMap es ideal para enums (más eficiente que HashMap)
		Map<RolEducativo, Integer> conteo = new EnumMap<>(RolEducativo.class);

		raw.forEach(p ->
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
			LocalDate fecha,
			List<RolEducativo> roles,
			String query,
			Pageable pageable
	) {

		List<RolEducativo> rolesFiltro = (roles == null || roles.isEmpty()) ? null : roles;

		String queryFiltro = (query == null || query.isBlank()) ? null : query;

		return empleadoEducativoRepository.buscarEmpleadosConRolVigente(
				fecha,
				rolesFiltro,
				queryFiltro,
				pageable
		);
	}

	@Override
	@Transactional
	public void registrarInasistenciasManuales(
			EmpleadoEducativo empleado,
			List<LocalDate> fechas,
			TipoLicencia tipoLicencia,
			String observacion
	) {

		if (fechas == null || fechas.isEmpty()) {
			return;
		}

		// 🔹 1. Traer todas las asistencias manuales existentes en una sola query
		List<Asistencia> existentes = asistenciaRepository
				.findByEmpleadoEducativoIdAndFechaIn(empleado.getId(), fechas);

		Map<LocalDate, Asistencia> existentesPorFecha =
				existentes.stream()
						.collect(Collectors.toMap(
								Asistencia::getFecha,
								a -> a
						));

		List<Asistencia> aGuardar = new ArrayList<>();

		for (LocalDate fecha : fechas) {

			// 🔹 2. No permitir registrar manual si hay licencia activa
			if (empleado.licenciaActivaEn(fecha).isPresent()) {
				throw new IllegalStateException(
						"No se puede registrar inasistencia manual el " + fecha +
								" porque existe una licencia activa"
				);
			}

			Asistencia existente = existentesPorFecha.get(fecha);

			if (existente != null) {
				// ✅ Actualizar manual existente
				existente.actualizarManual(tipoLicencia, observacion);
				aGuardar.add(existente);

			} else {
				// ✅ Crear nueva asistencia manual
				Asistencia nueva = new Asistencia(
						empleado,
						fecha,
						EstadoAsistencia.AUSENTE,
						tipoLicencia,
						observacion
				);

				aGuardar.add(nueva);
			}
		}

		asistenciaRepository.saveAll(aGuardar);
	}

	@Override
	public void eliminarInasistenciasManual(Long empleadoId, List<LocalDate> fechas) {

		if (fechas == null || fechas.isEmpty()) {
			return;
		}

		List<Asistencia> asistencias = asistenciaRepository.findByEmpleadoEducativoIdAndFechaIn(empleadoId, fechas);

		for (Asistencia asistencia : asistencias) {

			// 🔹 Solo se pueden eliminar AUSENTES manuales
			if (asistencia.getEstadoAsistencia() != EstadoAsistencia.AUSENTE) {
				throw new IllegalStateException("No se puede eliminar una asistencia que no sea AUSENTE");
			}
		}
		asistenciaRepository.deleteAll(asistencias);
	}

	/**
	 * Construye el estado real del empleado en una fecha específica
	 * Reglas:
	 * 1️⃣ Si existe asistencia manual persistida → se usa esa.
	 * 2️⃣ Si no hay manual pero hay licencia activa → AUSENTE por licencia.
	 * 3️⃣ Si no hay nada → PRESENTE.
	 */
	private EstadoAsistenciaDia construirEstadoDia(
			EmpleadoEducativo empleado,
			LocalDate fecha,
			Map<LocalDate, Asistencia> manualesPorFecha
	) {

		// 🔹 Caso 1: asistencia manual
		Asistencia manual = manualesPorFecha.get(fecha);
		if (manual != null) {
			return EstadoAsistenciaDia.manual(manual);
		}

		// 🔹 Caso 2: licencia activa
		Optional<Licencia> licenciaActiva = empleado.licenciaActivaEn(fecha);

		return licenciaActiva.map(licencia -> EstadoAsistenciaDia.porLicencia(
				fecha,
				licencia
		)).orElseGet(() -> EstadoAsistenciaDia.presente(fecha));

	}

	public List<LocalDate> diasQueDebeAsistir(
			EmpleadoEducativo empleado,
			YearMonth yearMonth
	) {

		LocalDate inicio = yearMonth.atDay(1);
		LocalDate fin = yearMonth.atEndOfMonth();

		List<LocalDate> resultado = new ArrayList<>();

		inicio.datesUntil(fin.plusDays(1))
				.forEach(fecha -> {
					if (empleado.debeAsistirEn(fecha)) {
						resultado.add(fecha);
					}
				});

		return resultado;
	}

}

