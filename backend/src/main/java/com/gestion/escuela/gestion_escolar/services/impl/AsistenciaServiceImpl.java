package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.Asistencia;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.RolCantidad;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.OrigenAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.persistence.AsignacionRepository;
import com.gestion.escuela.gestion_escolar.persistence.AsistenciaRepository;
import com.gestion.escuela.gestion_escolar.persistence.EmpleadoEducativoRepository;
import com.gestion.escuela.gestion_escolar.services.AsistenciaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

@Service
@Transactional
@AllArgsConstructor
public class AsistenciaServiceImpl implements AsistenciaService {

	private final AsistenciaRepository asistenciaRepository;
	private final AsignacionRepository asignacionRepository;
	private final EmpleadoEducativoRepository empleadoEducativoRepository;

	@Override
	public void impactarLicencia(Licencia licencia) {

		EmpleadoEducativo empleado = licencia.getEmpleadoEducativo();
		List<LocalDate> diasLaborables = empleado.calcularDiasLaborables(licencia);

		for (LocalDate fecha : diasLaborables) {

			Optional<Asistencia> existente = asistenciaRepository.findByEmpleadoEducativoIdAndFecha(empleado.getId(), fecha);

			Asistencia asistencia;
			if (existente.isPresent()) {
				asistencia = existente.get();
				asistencia.setOrigenAsistencia(OrigenAsistencia.LICENCIA);
				asistencia.setLicencia(licencia);
				asistencia.setObservacion(null);

			} else {
				asistencia = new Asistencia(
						empleado,
						fecha,
						OrigenAsistencia.LICENCIA,
						licencia.getTipoLicencia(),
						licencia,
						null
				);

			}
			asistenciaRepository.save(asistencia);
		}
	}

	@Override
	@Transactional(readOnly = true)
	public List<Asistencia> asistenciasDe(Long empleadoId) {
		return asistenciaRepository.findByEmpleadoEducativoId(empleadoId);
	}

	@Override
	public List<Asistencia> obtenerAsistenciasDelMes(
			Long escuelaId,
			Long empleadoId,
			YearMonth mes
	) {
		LocalDate fechaDesde = mes.atDay(1);
		LocalDate fechaHasta = mes.atEndOfMonth();

		return asistenciaRepository
				.findByEscuelaIdAndEmpleadoEducativoIdAndFechaBetween(
						escuelaId,
						empleadoId,
						fechaDesde,
						fechaHasta
				);
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
	public List<EmpleadoEducativo> buscarEmpleados(
			LocalDate fecha,
			List<RolEducativo> roles,
			String query
	) {
		return empleadoEducativoRepository.buscarEmpleadosConRolVigente(
				fecha,
				roles == null || roles.isEmpty() ? null : roles,
				query == null || query.isBlank() ? null : query
		);
	}


	@Override
	public void registrarInasistenciasManuales(
			EmpleadoEducativo empleado,
			List<LocalDate> fechas,
			TipoLicencia tipoLicencia,
			String observacion
	) {
		List<Asistencia> resultado = new ArrayList<>();

		for (LocalDate fecha : fechas) {

			Optional<Asistencia> existenteOpt =
					asistenciaRepository.findByEmpleadoEducativoIdAndFecha(
							empleado.getId(),
							fecha
					);

			if (existenteOpt.isPresent()) {
				Asistencia existente = existenteOpt.get();

				// ❌ No se puede editar si viene de licencia
				if (existente.getOrigenAsistencia() == OrigenAsistencia.LICENCIA) {
					throw new IllegalStateException(
							"La asistencia del " + fecha + " fue generada por licencia y no puede editarse"
					);
				}

				// ✅ Editar asistencia MANUAL existente
				existente.actualizarManual(tipoLicencia, observacion);
				resultado.add(existente);

			} else {
				// ✅ Crear nueva asistencia MANUAL
				Asistencia nueva = new Asistencia(
						empleado,
						fecha,
						OrigenAsistencia.MANUAL,
						tipoLicencia,
						null,
						observacion
				);
				resultado.add(nueva);
			}
		}

		asistenciaRepository.saveAll(resultado);
	}

	@Override
	public void eliminarInasistenciasManual(
			Long empleadoId,
			List<LocalDate> fechas
	) {
		if (fechas == null || fechas.isEmpty()) {
			return;
		}

		List<Asistencia> asistencias =
				asistenciaRepository.findByEmpleadoEducativoIdAndFechaIn(
						empleadoId,
						fechas
				);

		for (Asistencia asistencia : asistencias) {

			// ✅ solo AUSENTES
			if (!asistencia.getEstadoAsistencia().equals(EstadoAsistencia.AUSENTE)) {
				throw new IllegalStateException(
						"No se puede eliminar una asistencia que no sea AUSENTE"
				);
			}

			// ✅ solo MANUALES (sin licencia)
			if (asistencia.getLicencia() != null) {
				throw new IllegalStateException(
						"No se puede eliminar una inasistencia generada por licencia"
				);
			}
		}

		asistenciaRepository.deleteAll(asistencias);
	}


}

