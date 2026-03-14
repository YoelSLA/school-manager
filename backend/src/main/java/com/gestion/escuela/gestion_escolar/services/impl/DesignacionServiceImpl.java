package com.gestion.escuela.gestion_escolar.services.impl;

import com.gestion.escuela.gestion_escolar.controllers.dtos.designaciones.DesignacionCursoFilterDTO;
import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.Articulo13;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.CambioDeFuncion;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.CaracteristicaAsignacion;
import com.gestion.escuela.gestion_escolar.models.caracteristicaAsignacion.RecalificacionLaboralDefinitiva;
import com.gestion.escuela.gestion_escolar.models.designacion.Designacion;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionAdministrativa;
import com.gestion.escuela.gestion_escolar.models.designacion.DesignacionCurso;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoCaracteristicaAsignacion;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoDuplicadoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RecursoNoEncontradoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.persistence.*;
import com.gestion.escuela.gestion_escolar.services.DesignacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class DesignacionServiceImpl implements DesignacionService {

	private final DesignacionRepository designacionRepository;
	private final LicenciaRepository licenciaRepository;
	private final EmpleadoEducativoRepository empleadoEducativoRepository;
	private final EscuelaRepository escuelaRepository;
	private final AsignacionRepository asignacionRepository;
	private final MateriaRepository materiaRepository;
	private final CursoRepository cursoRepository;

	/**
	 * Persiste una designación previamente creada y válida.
	 * No aplica reglas de negocio.
	 */
	@Override
	public <T extends Designacion> T crear(T designacion) {

		Validaciones.noNulo(designacion, "designacion");

		Escuela escuela = designacion.getEscuela();
		Integer cupof = designacion.getCupof();

		validarCupofUnico(
				escuela.getId(),
				cupof,
				null
		);

		return designacionRepository.save(designacion);
	}

	@Override
	public <T extends Designacion> void crearBatch(List<T> designaciones) {

		Validaciones.noVacio(designaciones, "designaciones");

		Escuela escuela = designaciones.get(0).getEscuela();
		Long escuelaId = escuela.getId();
		String nombreEscuela = escuela.getNombre();

	/* ======================
	   CUPOfs DEL BATCH
	====================== */

		Set<Integer> cupofsBatch = new HashSet<>();

		for (Designacion d : designaciones) {
			Integer cupof = d.getCupof();

			if (!cupofsBatch.add(cupof)) {
				throw new RecursoDuplicadoException(
						String.format(
								"Ya existe una designación con cupof %s en %s",
								cupof,
								nombreEscuela
						)
				);
			}
		}

	/* ======================
	   VALIDAR CONTRA DB
	====================== */

		List<Designacion> existentes =
				designacionRepository.findByEscuelaIdAndCupofIn(escuelaId, cupofsBatch);

		if (!existentes.isEmpty()) {

			Integer cupofDuplicado = existentes.get(0).getCupof();

			throw new RecursoDuplicadoException(
					String.format(
							"Ya existe una designación con cupof %s en %s",
							cupofDuplicado,
							nombreEscuela
					)
			);
		}

	/* ======================
	   GUARDAR
	====================== */

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
			LocalDate fechaTomaPosesion
	) {

		Validaciones.noNulo(fechaTomaPosesion, "fecha toma posesión");
		Validaciones.noVacio(designacionIds, "designacionIds");

		Licencia licencia = licenciaRepository.findById(licenciaId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("licencia", licenciaId)
				);

		EmpleadoEducativo suplente = empleadoEducativoRepository.findById(suplenteId)
				.orElseThrow(() ->
						new RecursoNoEncontradoException("empleado educativo", suplenteId)
				);

		List<Designacion> designaciones = obtenerDesignaciones(designacionIds);

		designaciones.forEach(d ->
				d.cubrirConSuplente(
						licencia,
						suplente,
						fechaTomaPosesion
				)
		);
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
	public Page<DesignacionCurso> obtenerDesignacionesCursoPorEscuela(
			Long escuelaId,
			DesignacionCursoFilterDTO filter,
			Pageable pageable
	) {

		if (!escuelaRepository.existsById(escuelaId)) {
			throw new RecursoNoEncontradoException("escuela", escuelaId);
		}

		String estado = filter.estado() == null
				? null
				: filter.estado().name();

		return designacionRepository.buscarCursosConFiltro(
				escuelaId,
				filter.cursoId(),
				filter.materiaId(),
				filter.orientacion(),
				estado,
				pageable
		);
	}

	@Override
	public Page<DesignacionAdministrativa> obtenerDesignacionesAdministrativasPorEscuela(
			Long escuelaId,
			Pageable pageable
	) {

		if (!escuelaRepository.existsById(escuelaId)) {
			throw new RecursoNoEncontradoException("escuela", escuelaId);
		}

		return designacionRepository.findAdministrativasByEscuelaId(escuelaId, pageable);
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

	@Override
	@Transactional
	public void actualizarDesignacionCurso(
			Long designacionId,
			Integer cupof,
			Long materiaId,
			Long cursoId,
			String orientacion,
			Set<FranjaHoraria> franjasHorarias
	) {

		DesignacionCurso designacionCurso = designacionRepository
				.findCursoById(designacionId)
				.orElseThrow(() -> new RecursoNoEncontradoException("Designación curso", designacionId));

		Materia materia = materiaRepository.findById(materiaId)
				.orElseThrow(() -> new RecursoNoEncontradoException("Materia", materiaId));

		Curso curso = cursoRepository.findById(cursoId)
				.orElseThrow(() -> new RecursoNoEncontradoException("Curso", cursoId));

		validarCupofUnico(
				designacionCurso.getEscuela().getId(),
				cupof,
				designacionCurso.getId()
		);

		designacionCurso.actualizar(cupof, materia, curso, orientacion);

		designacionCurso.reemplazarFranjas(franjasHorarias);
	}

	@Override
	@Transactional
	public void actualizarDesignacionAdministrativa(
			Long designacionId,
			Integer cupof,
			RolEducativo rolEducativo,
			Set<FranjaHoraria> franjasHorarias
	) {

		DesignacionAdministrativa designacion = designacionRepository
				.findAdministrativaById(designacionId)
				.orElseThrow(() -> new RecursoNoEncontradoException("Designación administrativa", designacionId));

		validarCupofUnico(
				designacion.getEscuela().getId(),
				cupof,
				designacion.getId()
		);

    /* ======================
       ACTUALIZAR CAMPOS
    ====================== */

		designacion.actualizar(cupof, rolEducativo);

    /* ======================
       ACTUALIZAR FRANJAS
    ====================== */

		designacion.reemplazarFranjas(franjasHorarias);
	}

	public Asignacion editarAsignacion(
			Long designacionId,
			Long asignacionId,
			Long empleadoId,
			LocalDate fechaTomaPosesion,
			LocalDate fechaCese
	) {

		EmpleadoEducativo empleado = empleadoEducativoRepository.findById(empleadoId)
				.orElseThrow(() -> new RecursoNoEncontradoException("empleado educativo", empleadoId));

		designacionRepository.findById(designacionId)
				.orElseThrow(() -> new RecursoNoEncontradoException("designación", designacionId));

		Asignacion asignacion = asignacionRepository
				.findByIdAndDesignacionId(asignacionId, designacionId)
				.orElseThrow(() -> new RecursoNoEncontradoException("asignacion", asignacionId));

		asignacion.actualizar(
				empleado,
				fechaTomaPosesion,
				fechaCese
		);

		return asignacionRepository.save(asignacion);
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

	private void validarCupofUnico(Long escuelaId, Integer cupof, Long designacionId) {

		boolean existe = designacionId == null
				? designacionRepository.existsByEscuelaIdAndCupof(escuelaId, cupof)
				: designacionRepository.existsByEscuelaIdAndCupofAndIdNot(escuelaId, cupof, designacionId);

		if (existe) {
			throw new RecursoDuplicadoException(
					String.format(
							"Ya existe una designación con cupof %s en la escuela %s",
							cupof,
							escuelaId
					)
			);
		}
	}


}

