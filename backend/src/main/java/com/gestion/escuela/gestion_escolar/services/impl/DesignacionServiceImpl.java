package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.Periodo;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.Articulo13;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.CambioDeFuncion;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.CaracteristicaAsignacion;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.RecalificacionLaboralDefinitiva;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.TipoCaracteristicaAsignacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.persistence.*;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class DesignacionServiceImpl implements DesignacionService {

	private final DesignacionRepository designacionRepository;
	private final LicenciaRepository licenciaRepository;
	private final EmpleadoEducativoRepository empleadoEducativoRepository;
	private final EscuelaRepository escuelaRepository;
	private final AsignacionRepository asignacionRepository;

	/**
	 * Persiste una designación previamente creada y válida.
	 * No aplica reglas de negocio.
	 */
	@Override
	public <T extends Designacion> T crear(T designacion) {
		if (designacion == null) {
			throw new IllegalArgumentException("La designación es obligatoria");
		}
		return designacionRepository.save(designacion);
	}

	@Override
	public <T extends Designacion> void crearBatch(List<T> designaciones) {
		if (designaciones == null || designaciones.isEmpty()) {
			throw new IllegalArgumentException(
					"Debe indicar al menos una designación"
			);
		}

		designacionRepository.saveAll(designaciones);
	}

	@Override
	public Designacion obtenerPorId(Long id) {
		return designacionRepository.findById(id)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("designación", id)
				);
	}

	@Override
	public List<Designacion> obtenerDesignaciones(List<Long> designacionIds) {
		List<Designacion> designaciones = designacionRepository.findAllById(designacionIds);

		if (designaciones.size() != designacionIds.size()) {
			throw new RuntimeException("No se encontraron las designaciones");
		}

		return designaciones;
	}

	@Override
	public Asignacion cubrirConTitular(
			Long designacionId,
			Long empleadoId,
			LocalDate fechaTomaPosesion,
			TipoCaracteristicaAsignacion caracteristica
	) {
		Designacion designacion = designacionRepository.findById(designacionId)
				.orElseThrow(() -> new RecursoNoEncontradoException("designación", designacionId));

		EmpleadoEducativo empleado = empleadoEducativoRepository.findById(empleadoId)
				.orElseThrow(() -> new RecursoNoEncontradoException("empleado educativo", empleadoId));

		AsignacionTitular titular = designacion.cubrirConTitular(empleado, fechaTomaPosesion);

		if (caracteristica != null) {
			titular.aplicarCaracteristica(crearCaracteristica(caracteristica));
		}

		designacionRepository.save(designacion);
		return titular;
	}

	@Override
	public AsignacionProvisional cubrirConProvisional(
			Long designacionId,
			Long empleadoId,
			LocalDate fechaDesde,
			LocalDate fechaHasta
	) {

		Designacion designacion = designacionRepository.findById(designacionId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("designación", designacionId)
				);

		EmpleadoEducativo empleado = empleadoEducativoRepository.findById(empleadoId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("empleado educativo", empleadoId)
				);

		if (fechaHasta != null && fechaHasta.isBefore(fechaDesde)) {
			throw new IllegalArgumentException("La fecha fin no puede ser anterior a la fecha inicio");
		}

		Periodo periodo = new Periodo(fechaDesde, fechaHasta);

		AsignacionProvisional asignacion = designacion.cubrirConProvisionalManual(empleado, periodo);

		designacionRepository.save(designacion);

		return asignacion;
	}

	@Override
	public void cubrirConSuplentes(
			Long licenciaId,
			Long suplenteId,
			List<Long> designacionIds,
			LocalDate fechaInicio
	) {
		if (fechaInicio == null) {
			throw new CampoObligatorioException("La fecha de inicio es obligatoria");
		}

		if (designacionIds == null || designacionIds.isEmpty()) {
			throw new CampoObligatorioException("Debe indicar al menos una designación");
		}

		Licencia licencia = licenciaRepository.findById(licenciaId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("licencia", licenciaId)
				);

		EmpleadoEducativo suplente = empleadoEducativoRepository.findById(suplenteId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("empleado educativo", suplenteId)
				);

		List<Designacion> designaciones = obtenerDesignaciones(designacionIds);

		designaciones.forEach(d -> {

			LocalDate inicioCiclo = fechaInicio;
			LocalDate hoy = LocalDate.now();

//			while (true) {
//
////				LocalDate finCiclo = licencia.getPeriodo().fechaFinEfectivaPara(inicioCiclo);
//
//				if (inicioCiclo.isAfter(hoy)) {
//					break;
//				}
//
//				d.cubrirConSuplente(licencia, suplente, inicioCiclo, finCiclo
//				);
//
//				inicioCiclo = finCiclo.plusDays(1);
//			}
		});
	}

	public AsignacionSuplente renovarCobertura(
			Long asignacionId,
			LocalDate nuevaFechaFin
	) {

		Asignacion actual = asignacionRepository.findById(asignacionId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("asignacion", asignacionId)
				);

		if (!actual.estaActivaEn(LocalDate.now())) {
			throw new IllegalStateException("Solo se puede renovar una asignación activa");
		}

		LocalDate nuevaFechaInicio = actual.getPeriodo().getFechaHasta().plusDays(1);

		if (!nuevaFechaFin.isAfter(nuevaFechaInicio.minusDays(1))) {
			throw new RangoFechasInvalidoException(nuevaFechaInicio, nuevaFechaInicio);
		}

		// 1️⃣ Cerrar actual
//		actual.finalizar();

		// 2️⃣ Crear nueva
		Periodo nuevoPeriodo = new Periodo(nuevaFechaInicio, nuevaFechaFin);

		//		actual.getDesignacion().agregarAsignacion(nueva);

		return new AsignacionSuplente(
				actual.getEmpleadoEducativo(),
				actual.getDesignacion(),
				nuevoPeriodo
		);
	}

	@Override
	public <T extends Designacion> Page<T> obtenerDesignacionesPorEscuela(
			Long escuelaId,
			Class<T> tipo,
			Pageable pageable
	) {
		if (escuelaId == null || tipo == null) {
			throw new IllegalArgumentException("Escuela y tipo son obligatorios");
		}

		if (!escuelaRepository.existsById(escuelaId)) {
			throw new RecursoNoEncontradoException("escuela", escuelaId);
		}

		return designacionRepository.findByEscuelaIdAndTipo(escuelaId, tipo, pageable);
	}


	@Override
	public Optional<Asignacion> obtenerCargoActivo(
			Long designacionId,
			LocalDate fecha
	) {
		Designacion designacion = obtenerPorId(designacionId);

		return designacion.asignacionQueEjerceEn(fecha);
	}

	@Override
	public List<Asignacion> obtenerOtrosCargos(
			Long designacionId,
			EstadoAsignacion estado,
			LocalDate fecha
	) {
		Designacion designacion = obtenerPorId(designacionId);

		Optional<Asignacion> activa =
				designacion.asignacionQueEjerceEn(fecha);

		return designacion.getAsignaciones().stream()

				// 1️⃣ excluir la que ejerce
				.filter(a -> activa.isEmpty() || !a.equals(activa.get()))

				// 2️⃣ filtrar por estado DERIVADO
				.filter(a -> estado == null || a.getEstadoEn(fecha) == estado)

				.toList();
	}


	private CaracteristicaAsignacion crearCaracteristica(
			TipoCaracteristicaAsignacion tipo
	) {
		return switch (tipo) {
			case ARTICULO_13 ->
					new Articulo13();
			case CAMBIO_DE_FUNCION ->
					new CambioDeFuncion();
			case RECALIFICACION_LABORAL_DEFINITIVA ->
					new RecalificacionLaboralDefinitiva();
		};
	}


}

