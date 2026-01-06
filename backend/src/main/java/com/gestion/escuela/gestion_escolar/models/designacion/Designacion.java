package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionNormal;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;

@Entity
@Table(
		name = "designaciones",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"escuela_id", "cupof"})
		}
)
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
public abstract class Designacion {


	@OneToMany(
			mappedBy = "designacion",
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private final Set<Asignacion> asignaciones;

	@OneToMany(
			mappedBy = "designacion",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private final Set<FranjaHoraria> franjasHorarias;

	@ManyToOne(optional = false)
	@JoinColumn(name = "escuela_id", nullable = false)
	private Escuela escuela;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Integer cupof;


	// 🔹 Constructor JPA
	protected Designacion() {
		this.franjasHorarias = new HashSet<>();
		this.asignaciones = new HashSet<>();
	}

	protected Designacion(Escuela escuela, Integer cupof) {
		if (escuela == null) {
			throw new IllegalArgumentException(
					"La designación debe pertenecer a una escuela"
			);
		}
		this.cupof = cupof;
		this.escuela = escuela;
		this.franjasHorarias = new HashSet<>();
		this.asignaciones = new HashSet<>();
	}

	public void asignarAEscuela(Escuela escuela) {
		if (escuela == null) {
			throw new IllegalArgumentException("La escuela es obligatoria");
		}
		this.escuela = escuela;
	}

	public void agregarFranjaHoraria(FranjaHoraria franja) {
		if (franja == null) {
			throw new IllegalArgumentException("La franja es obligatoria");
		}

		franja.setDesignacion(this);
		this.franjasHorarias.add(franja);
	}

	public Licencia crearLicencia(
			LocalDate fechaDesde,
			LocalDate fechaHasta,
			TipoLicencia tipoLicencia,
			String descripcion
	) {
		if (tipoLicencia == null) {
			throw new IllegalArgumentException("El tipo de licencia es obligatorio");
		}

		Asignacion asignacionQueEjerce =
				asignacionQueEjerceEn(LocalDate.now())
						.orElseThrow(() ->
								new IllegalStateException(
										"No hay asignación que ejerzca el cargo"
								)
						);

		return asignacionQueEjerce.solicitarLicencia(
				fechaDesde,
				fechaHasta,
				tipoLicencia,
				descripcion
		);
	}

	public void cubrirConSuplente(
			EmpleadoEducativo empleadoSuplente,
			Licencia licencia
	) {
		if (empleadoSuplente == null) {
			throw new IllegalArgumentException("El empleado suplente es obligatorio");
		}

		if (licencia == null) {
			throw new IllegalArgumentException("La licencia a cubrir es obligatoria");
		}

		Asignacion asignacionConLicencia = licencia.getAsignacion();

		// 1️⃣ La licencia debe pertenecer a esta designación
		if (!this.asignaciones.contains(asignacionConLicencia)) {
			throw new IllegalStateException(
					"La licencia no pertenece a esta designación"
			);
		}

		LocalDate desde = licencia.getFechaDesde();
		LocalDate hasta = licencia.getFechaHasta();

		// 2️⃣ El cargo no debe estar cubierto cuando empieza la licencia
		if (asignacionQueEjerceEn(desde).isPresent()) {
			throw new IllegalStateException(
					"El cargo ya está cubierto en el período de la licencia"
			);
		}

		// 3️⃣ La asignación debe estar vigente y en licencia en ese período
		if (!asignacionConLicencia.estaVigenteEn(desde)
				|| !asignacionConLicencia.estaEnLicenciaEn(desde)) {
			throw new IllegalStateException(
					"La licencia no es válida para ser cubierta"
			);
		}

		// 4️⃣ Crear la asignación SUPLENTE con fechas EXACTAS
		Asignacion suplente = new AsignacionNormal(
				this,
				empleadoSuplente,
				desde,
				hasta,
				SituacionDeRevista.SUPLENTE
		);

		this.asignaciones.add(suplente);
	}

	public boolean tieneSuplentePara(Licencia licencia) {
		return estaCubierta(licencia);
	}


	private boolean estaCubierta(Licencia licencia) {

		if (licencia == null) {
			throw new IllegalArgumentException("La licencia es obligatoria");
		}

		return asignaciones.stream()
				.anyMatch(asignacion ->
						asignacion.getSituacionDeRevista() == SituacionDeRevista.SUPLENTE
								&& asignacion.getFechaTomaPosesion().equals(licencia.getFechaDesde())
								&& asignacion.getFechaCese().equals(licencia.getFechaHasta())
				);
	}


//	public void darBajaAsignacion(Asignacion asignacion, CausaBaja causaBaja) {
//		if (asignacion == null) {
//			throw new IllegalArgumentException("La asignación es obligatoria");
//		}
//
//		if (!asignaciones.contains(asignacion)) {
//			throw new IllegalArgumentException("La asignación no pertenece a esta designación");
//		}
//
//		asignacion.darBajaDefinitiva(causaBaja);
//
//		resolverCoberturaTrasBaja(asignacion);
//	}

	public Optional<Asignacion> asignacionQueEjerceEn(LocalDate fecha) {
		return asignaciones.stream().filter(a -> a.ejerceCargoEn(fecha)).findFirst();
	}

	public List<Asignacion> titulares() {
		return asignacionesPorSituacion(SituacionDeRevista.TITULAR);
	}

	public List<Asignacion> provisionales() {
		return asignacionesPorSituacion(SituacionDeRevista.PROVISIONAL);
	}

	public List<Asignacion> suplentes() {
		return asignacionesPorSituacion(SituacionDeRevista.SUPLENTE);
	}

//	public Optional<Asignacion> titularVigenteEn(LocalDate fecha) {
//		return asignacionPorSituacionYFecha(SituacionDeRevista.TITULAR, fecha, a -> a.estaVigenteEn(fecha));
//	}
//
//	public Optional<Asignacion> titularQueEjerceEn(LocalDate fecha) {
//		return asignacionPorSituacionYFecha(SituacionDeRevista.TITULAR, fecha, a -> a.estaEjerciendoEn(fecha));
//	}
//
//	public Optional<Asignacion> provisionalVigenteEn(LocalDate fecha) {
//		return asignacionPorSituacionYFecha(SituacionDeRevista.PROVISIONAL, fecha, a -> a.estaVigenteEn(fecha));
//	}
//
//	public Optional<Asignacion> provisionalQueEjerceEn(LocalDate fecha) {
//		return asignacionPorSituacionYFecha(SituacionDeRevista.PROVISIONAL, fecha, a -> a.estaEjerciendoEn(fecha));
//	}
//
//	public Optional<Asignacion> suplenteVigenteEn(LocalDate fecha) {
//		return asignacionPorSituacionYFecha(SituacionDeRevista.SUPLENTE, fecha, a -> a.estaVigenteEn(fecha));
//	}
//
//	public Optional<Asignacion> suplenteQueEjerceEn(LocalDate fecha) {
//		return asignacionPorSituacionYFecha(SituacionDeRevista.SUPLENTE, fecha, a -> a.estaEjerciendoEn(fecha));
//	}

	// PRIVATE

	private LocalDate calcularFechaCeseProvisional(LocalDate fechaToma) {

		LocalDate primeroDeMarzo = LocalDate.of(fechaToma.getYear(), 3, 1);

		if (fechaToma.isBefore(primeroDeMarzo)) {
			return primeroDeMarzo;
		}

		return LocalDate.of(fechaToma.getYear() + 1, 3, 1);
	}

	private List<Asignacion> asignacionesPorSituacion(SituacionDeRevista situacion) {
		return asignaciones.stream()
				.filter(a -> a.getSituacionDeRevista() == situacion)
				.toList();
	}

	private Optional<Asignacion> asignacionPorSituacionYFecha(SituacionDeRevista situacion, LocalDate fecha,
															  Predicate<Asignacion> criterio
	) {
		return asignaciones.stream().filter(a -> a.getSituacionDeRevista() == situacion).filter(criterio).findFirst();
	}

//	private void convertirSuplenteEnProvisional(Asignacion suplente) {
//
//		// 1️⃣ Dar de baja la suplencia
//		suplente.darBajaDefinitiva(CausaBaja.REORGANIZACION_DEL_CARGO);
//
//		// 2️⃣ Crear asignación provisional
//		Asignacion provisional = new Asignacion(
//				suplente.getEmpleadoEducativo(),
//				LocalDate.now(),
//				calcularFechaCeseProvisional(LocalDate.now()),
//				SituacionDeRevista.PROVISIONAL
//		);
//
//		// 3️⃣ Asociarla a la designación
//		agregarAsignacion(provisional);
//	}
//
//	private void dejarDesignacionPendiente() {
//		// no hay asignación activa
//		// el cargo queda sin cubrir
//		// no se crea nada automáticamente
//	}
//
//	private void resolverCoberturaTrasBaja(Asignacion asignacion) {
//
//		// 2️⃣ Si se dio de baja un TITULAR
//		if (asignacion.getSituacionDeRevista() == SituacionDeRevista.TITULAR) {
//			Optional<Asignacion> suplente = suplenteVigenteEn(LocalDate.now());
//
//			if (suplente.isPresent()) {
//				convertirSuplenteEnProvisional(suplente.get());
//			} else {
//				dejarDesignacionPendiente();
//			}
//		}
//
//		// 1️⃣ Si se dio de baja un PROVISIONAL → queda pendiente
//		if (asignacion.getSituacionDeRevista() == SituacionDeRevista.PROVISIONAL) {
//			// caso que hablaste antes
//			dejarDesignacionPendiente();
//		}
//
//
//	}
//
//
//	public boolean estaPendienteEn(LocalDate fecha) {
//		return asignacionQueEjerceEn(fecha).isEmpty();
//	}
}
