package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.*;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionProvisional;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionSuplente;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionTitular;
import com.gestion.escuela.gestion_escolar.models.domainServices.ServicioCobertura;
import com.gestion.escuela.gestion_escolar.models.domainServices.ServicioRenovacion;
import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoDesignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.designacion.DesignacionYaCubiertaException;
import com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria.RangoHorarioInvalidoException;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Stream;

import static com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista.TITULAR;

@Entity
@Table(
		name = "designacion",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"escuela_id", "cupof"})
		}
)
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
public abstract class Designacion {

	@Transient
	private final Map<LocalDate, EstadoDesignacion> cacheEstados =
			new ConcurrentHashMap<>();
	@ElementCollection
	@CollectionTable(
			name = "franja_horaria",
			joinColumns = @JoinColumn(name = "designacion_id")
	)
	private Set<FranjaHoraria> franjasHorarias;
	@OneToMany(
			mappedBy = "designacion",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private List<Asignacion> asignaciones;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private Integer cupof;
	@ManyToOne(optional = false)
	@JoinColumn(name = "escuela_id", nullable = false)
	private Escuela escuela;
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private RolEducativo rolEducativo;

	// =========================================================
	// Constructor
	// =========================================================
	protected Designacion() {
		this.asignaciones = new ArrayList<>();
		this.franjasHorarias = new HashSet<>();
	}

	protected Designacion(Escuela escuela, Integer cupof, RolEducativo rolEducativo) {
		Validaciones.noNulo(escuela, "escuela");
		Validaciones.noNulo(cupof, "cupof");
		Validaciones.noNulo(rolEducativo, "rol educativo");

		this.escuela = escuela;
		this.cupof = cupof;
		this.rolEducativo = rolEducativo;
		this.asignaciones = new ArrayList<>();
		this.franjasHorarias = new HashSet<>();
	}
	// =========================================================
	// Gestión de Franjas Horarias
	// =========================================================
	/**
	 * Agrega una nueva franja horaria a la designación.
	 *
	 * <p>La franja no debe superponerse con ninguna de las ya registradas.
	 * En caso de detectarse un solapamiento se lanza una excepción.</p>
	 *
	 * @param nueva franja horaria a agregar.
	 * @throws RangoHorarioInvalidoException si existe superposición horaria.
	 */
	public void agregarFranjaHoraria(FranjaHoraria nueva) {
		Validaciones.noNulo(nueva, "franja horaria");

		boolean haySolapamiento = franjasHorarias.stream()
				.anyMatch(f -> f.seSuperponeCon(nueva));

		if (haySolapamiento) {
			throw new RangoHorarioInvalidoException(nueva.getHoraDesde(), nueva.getHoraHasta());
		}

		franjasHorarias.add(nueva);
	}

	/**
	 * Reemplaza todas las franjas horarias de la designación.
	 *
	 * <p>Las franjas existentes son eliminadas y las nuevas son validadas
	 * individualmente antes de agregarse.</p>
	 *
	 * @param nuevasFranjas conjunto de franjas horarias a establecer.
	 */
	public void setFranjasHorarias(Set<FranjaHoraria> nuevasFranjas) {
		Validaciones.noNulo(nuevasFranjas, "franjas horarias");
		this.franjasHorarias.clear();
		nuevasFranjas.forEach(this::agregarFranjaHoraria);
	}

	/**
	 * Indica si la designación tiene actividad laboral en la fecha indicada.
	 *
	 * @param fecha fecha a consultar.
	 * @return {@code true} si existe una franja horaria para el día
	 * correspondiente y éste es laborable; {@code false} en caso contrario.
	 */
	public boolean trabajaElDia(LocalDate fecha) {

		if (fecha == null) {
			return false;
		}

		DiaDeSemana dia = DiaDeSemana.from(fecha);

		return dia.esLaborable() && franjasHorarias.stream()
						.anyMatch(f -> f.getDia().equals(dia));
	}
	// =========================================================
	// Gestión de Asignaciones
	// =========================================================
	/**
	 * Agrega una asignación a la designación.
	 *
	 * <p>No permite agregar una asignación cuya fecha de inicio coincida con una
	 * cobertura ya ejercida por otra asignación.</p>
	 *
	 * <p>Además mantiene sincronizadas las relaciones bidireccionales con la
	 * designación y el empleadoEducativoBasico educativo.</p>
	 *
	 * @param asignacion asignación a incorporar.
	 * @throws DesignacionYaCubiertaException si la designación ya se encuentra
	 * cubierta en la fecha de inicio de la asignación.
	 */
	public void agregarAsignacion(Asignacion asignacion) {

		// Valida que la asignación no sea null
		Validaciones.noNulo(asignacion, "asignación");

		// Obtiene la fecha de inicio de la asignación
		LocalDate fechaInicio = asignacion.getPeriodo().getFechaDesde();

		// Verifica si ya existe una asignación ejerciente para esa misma fecha en esta designación
		boolean hayAsignacionQueEjerce = asignacionesEjercientesEn(fechaInicio).findAny().isPresent();

		// No se puede cubrir una designación ya cubierta
		if (hayAsignacionQueEjerce) {
			throw new DesignacionYaCubiertaException(this);
		}

		// Evita duplicados en la colección
		if (!asignaciones.contains(asignacion)) {
			asignaciones.add(asignacion);
		}

		// Mantiene sincronizada la relación
		// Asignacion -> Designacion
		asignacion.setDesignacion(this);

		// Mantiene sincronizada la relación
		// EmpleadoEducativo -> Asignacion
		asignacion.getEmpleadoEducativo().agregarAsignacion(asignacion);
	}

	/**
	 * Elimina una asignación de la designación.
	 *
	 * <p>También actualiza la colección de asignaciones del empleadoEducativoBasico asociado.</p>
	 *
	 * @param asignacion asignación a eliminar.
	 */
	public void eliminarAsignacion(Asignacion asignacion) {
		asignaciones.remove(asignacion);
		asignacion.getEmpleadoEducativo().eliminarAsignacion(asignacion);
	}

	/**
	 * Obtiene la asignación que efectivamente ejerce la designación en la fecha
	 * indicada.
	 *
	 * <p>Una asignación se considera ejerciendo cuando:</p>
	 * <ul>
	 *     <li>Se encuentra activa en la fecha consultada.</li>
	 *     <li>El empleadoEducativoBasico asociado no posee una licencia vigente en dicha fecha.</li>
	 * </ul>
	 *
	 * <p>Si todas las asignaciones activas corresponden a empleados
	 * licenciados, se devuelve {@link Optional#empty()}.</p>
	 *
	 * @param fecha fecha a evaluar.
	 * @return la asignación que ejerce efectivamente la designación en la fecha
	 * indicada, o vacío si no existe ninguna.
	 */
	public Optional<Asignacion> asignacionQueEjerceEn(LocalDate fecha) {
		if (fecha == null)
			return Optional.empty();

		return asignacionesActivasEn(fecha)
				.filter(a -> !a.getEmpleadoEducativo().tieneLicenciaEn(fecha))
				.findFirst();
	}

	/**
	 * Obtiene la asignación que efectivamente ejerce la designación durante el
	 * período indicado.
	 *
	 * <p>Una asignación se considera ejerciendo cuando:</p>
	 * <ul>
	 *     <li>Su período se superpone con el período consultado.</li>
	 *     <li>El empleadoEducativoBasico asociado no posee una licencia que se superponga con
	 *     dicho período.</li>
	 * </ul>
	 *
	 * <p>Si todas las asignaciones superpuestas corresponden a empleados
	 * licenciados, se devuelve {@link Optional#empty()}.</p>
	 *
	 * @param periodo período a evaluar.
	 * @return la asignación que ejerce efectivamente la designación durante el
	 * período indicado, o vacío si no existe ninguna.
	 */
	public Optional<Asignacion> asignacionQueEjerceEn(Periodo periodo) {
		if (periodo == null)
			return Optional.empty();

		return asignaciones.stream()
				.filter(a -> a.seSuperponeCon(periodo))
				.filter(a -> !a.getEmpleadoEducativo().tieneLicenciaSuperpuestaEn(periodo))
				.findFirst();
	}

	/**
	 * Obtiene el empleadoEducativoBasico que ejerce efectivamente la designación en la fecha
	 * indicada.
	 *
	 * @param fecha fecha a consultar.
	 * @return el empleadoEducativoBasico activo en la fecha indicada o vacío si no existe.
	 */
	public Optional<EmpleadoEducativo> getEmpleadoActivoEn(LocalDate fecha) {
		return asignacionQueEjerceEn(fecha).map(Asignacion::getEmpleadoEducativo);
	}

	/**
	 * Indica si existe una asignación titular ejerciendo la designación en la
	 * fecha indicada.
	 *
	 * @param fecha fecha a consultar.
	 * @return {@code true} si existe un titular activo; {@code false} en caso
	 * contrario.
	 */
	public boolean tieneTitularActivo(LocalDate fecha) {
		return asignacionesEjercientesEn(fecha).anyMatch(a -> a.getSituacionDeRevista().equals(TITULAR));
	}

	/**
	 * Determina si la designación se encuentra cubierta en la fecha indicada.
	 *
	 * @param fecha fecha a consultar.
	 * @return {@code true} si alguna asignación ejerce la designación en dicha
	 * fecha.
	 */
	public boolean estaCubiertaEn(LocalDate fecha) {
		return asignacionesEjercientesEn(fecha).findAny().isPresent();
	}

	/**
	 * Verifica si alguna asignación de la designación se superpone con el período
	 * indicado.
	 *
	 * @param periodo período a evaluar.
	 * @return {@code true} si existe al menos una superposición.
	 */
	public boolean tieneAsignacionQueSeSuperponeCon(Periodo periodo) {
		return this.asignaciones.stream()
				.anyMatch(a -> a.seSuperponeCon(periodo));
	}

	/**
	 * Obtiene la asignación activa de un empleadoEducativoBasico en una fecha determinada.
	 *
	 * @param empleado empleadoEducativoBasico a buscar.
	 * @param fecha fecha de consulta.
	 * @return la asignación activa del empleadoEducativoBasico o vacío si no existe.
	 */
	public Optional<Asignacion> getAsignacionActivaDe(EmpleadoEducativo empleado, LocalDate fecha) {
		return asignacionesActivasEn(fecha)
				.filter(a -> a.getEmpleadoEducativo().equals(empleado))
				.findFirst();
	}
	// =========================================================
	// Cobertura
	// =========================================================
	/**
	 * Cubre la designación mediante una asignación titular.
	 *
	 * @param empleado empleadoEducativoBasico que tomará posesión del cargo.
	 * @param fechaDesde fecha de inicio de la cobertura.
	 * @param secuencia número de secuencia de la asignación.
	 * @return la asignación titular creada.
	 */
	public AsignacionTitular cubrirConTitular(
			EmpleadoEducativo empleado,
			LocalDate fechaDesde,
			Integer secuencia
	) {
		return ServicioCobertura.cubrirConTitular(this,empleado,fechaDesde,secuencia);
	}

	/**
	 * Genera una cobertura provisional automática para la designación.
	 *
	 * @param empleado empleadoEducativoBasico asignado.
	 * @param fechaInicio fecha de inicio.
	 * @param secuencia número de secuencia.
	 * @return la asignación provisional creada.
	 */
	public AsignacionProvisional cubrirConProvisionalAutomatico(
			EmpleadoEducativo empleado,
			LocalDate fechaInicio,
			Integer secuencia
	) {
		return ServicioCobertura.cubrirConProvisionalAutomatico(
				this,
				empleado,
				fechaInicio,
				secuencia
		);
	}

	/**
	 * Genera una cobertura provisional manual para la designación.
	 *
	 * @param empleado empleadoEducativoBasico asignado.
	 * @param periodo período de vigencia.
	 * @param secuencia número de secuencia.
	 * @return la asignación provisional creada.
	 */
	public AsignacionProvisional cubrirConProvisionalManual(
			EmpleadoEducativo empleado,
			Periodo periodo,
			Integer secuencia
	) {
		return ServicioCobertura.cubrirConProvisionalManual(this,empleado,periodo,secuencia);
	}

	/**
	 * Genera una cobertura suplente para una licencia existente.
	 *
	 * @param licencia licencia que origina la vacante.
	 * @param suplente empleadoEducativoBasico suplente.
	 * @param fechaInicio fecha de toma de posesión.
	 * @param secuencia número de secuencia.
	 * @return la asignación suplente creada.
	 */
	public AsignacionSuplente cubrirConSuplente(
			Licencia licencia,
			EmpleadoEducativo suplente,
			LocalDate fechaInicio,
			Integer secuencia
	) {

		Asignacion asignacionLicenciada = licencia.getAsignaciones()
				.stream()
				.filter(a -> a.getDesignacion().equals(this))
				.findFirst()
				.orElseThrow(() ->
						new IllegalStateException(
								"La licencia no afecta a esta designación"
						));

		return ServicioCobertura.cubrirConSuplente(
				asignacionLicenciada,
				licencia,
				suplente,
				fechaInicio,
				secuencia
		);
	}
	// =========================================================
	// Renovaciones
	// =========================================================
	/**
	 * Renueva automáticamente una asignación provisional.
	 *
	 * @param anterior asignación a renovar.
	 * @param secuencia número de secuencia.
	 * @return la nueva asignación provisional.
	 */
	public AsignacionProvisional renovarProvisionalAutomatica(
			AsignacionProvisional anterior,
			Integer secuencia
	) {
		return ServicioRenovacion
				.renovarProvisionalAutomatica(
						this,
						anterior,
						secuencia
				);
	}

	/**
	 * Renueva una asignación provisional a partir del ciclo lectivo de marzo.
	 *
	 * @param asignacionAnterior asignación a renovar.
	 * @param fechaHasta fecha de finalización de la renovación.
	 * @param secuencia número de secuencia.
	 * @return la nueva asignación provisional.
	 */
	public AsignacionProvisional renovarProvisionalDesdeMarzo(
			AsignacionProvisional asignacionAnterior,
			LocalDate fechaHasta,
			Integer secuencia
	) {
		return ServicioRenovacion
				.renovarProvisionalDesdeMarzo(
						this,
						asignacionAnterior,
						fechaHasta,
						secuencia
				);
	}

	/**
	 * Renueva manualmente una asignación provisional.
	 *
	 * @param anterior asignación a renovar.
	 * @param nuevoPeriodo nuevo período de vigencia.
	 * @param secuencia número de secuencia.
	 * @return la nueva asignación provisional.
	 */
	public AsignacionProvisional renovarProvisionalManual(
			AsignacionProvisional anterior,
			Periodo nuevoPeriodo,
			Integer secuencia
	) {
		return ServicioRenovacion
				.renovarProvisionalManual(
						this,
						anterior,
						nuevoPeriodo,
						secuencia
				);
	}
	// =========================================================
	// Estado y Vigencia
	// =========================================================
	/**
	 * Determina si existe una vacante transitoria por licencia en la fecha
	 * indicada.
	 *
	 * @param fecha fecha a consultar.
	 * @return {@code true} si alguna asignación se encuentra en licencia.
	 */
	public boolean tieneVacantePorLicenciaEn(LocalDate fecha) {
		return asignaciones.stream().anyMatch(a -> a.estaEnLicenciaEn(fecha));
	}

	/**
	 * Obtiene el estado de cobertura de la designación en una fecha.
	 *
	 * @param fecha fecha a consultar.
	 * @return estado de la designación para la fecha indicada.
	 */
	@Transient
	public EstadoDesignacion getEstadoEn(LocalDate fecha) {

		return cacheEstados.computeIfAbsent(
				fecha,
				f -> EstadoDesignacion.desdeCobertura(
						asignacionQueEjerceEn(f).isPresent()
				)
		);
	}

	/**
	 * Obtiene el estado de cobertura de la designación durante un período.
	 *
	 * @param periodo período a consultar.
	 * @return estado de la designación durante el período indicado.
	 */
	@Transient
	public EstadoDesignacion getEstadoEn(Periodo periodo) {
		return EstadoDesignacion.desdeCobertura(asignacionQueEjerceEn(periodo).isPresent());
	}

	/**
	 * Obtiene la suplencia activa en la fecha indicada.
	 *
	 * @param fecha fecha a consultar.
	 * @return la asignación suplente activa o vacío si no existe.
	 */
	public Optional<AsignacionSuplente> getSuplenciaActivaEn(LocalDate fecha) {
		return asignacionesActivasEn(fecha)
				.filter(AsignacionSuplente.class::isInstance)
				.map(AsignacionSuplente.class::cast)
				.findFirst();
	}
	// =========================================================
	// Gestión Institucional
	// =========================================================
	/**
	 * Modifica la escuela asociada a la designación.
	 *
	 * @param escuela nueva escuela.
	 */
	public void setEscuela(Escuela escuela) {
		Validaciones.noNulo(escuela, "escuela");
		this.escuela = escuela;
	}

	/**
	 * Modifica el cupof de la designación.
	 *
	 * @param cupof nuevo cupof.
	 */
	public void setCupof(Integer cupof) {
		Validaciones.noNulo(cupof, "cupof");
		this.cupof = cupof;
	}

	/**
	 * Modifica el rol educativo de la designación.
	 *
	 * @param rolEducativo nuevo rol educativo.
	 */
	public void setRolEducativo(RolEducativo rolEducativo) {
		Validaciones.noNulo(rolEducativo, "rol educativo");
		this.rolEducativo = rolEducativo;
	}
	// =========================================================
	// Notificaciones y Transiciones
	// =========================================================
	/**
	 * Metodo interno de coordinación utilizado cuando una asignación
	 * genera una vacante definitiva.
	 *
	 * <p>No representa un caso de uso público del dominio y no debe
	 * invocarse directamente desde servicios, controladores o tests.
	 *
	 * <p>La entrada correcta al flujo es:
	 * {@link Asignacion#finalizarPorBajaDefinitiva(CausaBaja, LocalDate)}
	 */
	public void notificarBajaDefinitivaDe(
			Asignacion asignacion,
			LocalDate fechaBaja
	) {

		Validaciones.noNulo(asignacion, "asignación");
		Validaciones.noNulo(fechaBaja, "fecha bajaAsignacion");

		if (!asignacion.puedeGenerarVacanteDefinitiva()) {
			return;
		}

		getSuplenciaActivaEn(fechaBaja)
				.ifPresent(suplente -> {
					LocalDate inicioProvisional = fechaBaja.plusDays(1);
					suplente.convertirseEnProvisional(inicioProvisional, suplente.getSecuencia());
				});
	}

	// =========================================================
	// Infraestructura / Utilitarios
	// =========================================================
	@Override
	public String toString() {
		return getClass().getSimpleName() + "{ " +
				"id = " + id +
				", cupof = " + cupof +
				", escuela  = " + (escuela != null ? escuela : null) +
				", rolEducativo = " + rolEducativo +
				", asignacion = " + asignaciones.size() +
				" }";
	}

	/**
	 * Obtiene todas las asignaciones activas en una fecha determinada.
	 *
	 * @param fecha fecha de consulta.
	 * @return stream de asignaciones activas.
	 */
	private Stream<Asignacion> asignacionesActivasEn(LocalDate fecha) {
		return asignaciones.stream().filter(a -> a.estaActivaEn(fecha));
	}

	/**
	 * Obtiene todas las asignaciones que ejercen efectivamente la designación
	 * en una fecha determinada.
	 *
	 * @param fecha fecha de consulta.
	 * @return stream de asignaciones ejercientes.
	 */
	private Stream<Asignacion> asignacionesEjercientesEn(LocalDate fecha) {
		return asignaciones.stream().filter(a -> a.estaEjerciendoEn(fecha));
	}


	public Optional<AsignacionSuplente> suplenciaDe(
			Licencia licencia
	) {
		Validaciones.noNulo(licencia, "licencia");

		return asignaciones.stream()
				.filter(AsignacionSuplente.class::isInstance)
				.map(AsignacionSuplente.class::cast)
				.filter(a -> licencia.equals(a.getLicencia()))
				.findFirst();
	}

}