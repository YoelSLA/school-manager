package com.gestion.escuela.gestion_escolar.models.designacion;

import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.FranjaHoraria;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.asignacion.AsignacionNormal;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Entity
@Table(
		name = "designaciones",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"escuela_id", "cupof"})
		}
)
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
public abstract class Designacion {

	@OneToMany(
			mappedBy = "designacion",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private final Set<Asignacion> asignaciones;

	@OneToMany(
			mappedBy = "designacion",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private final Set<FranjaHoraria> franjasHorarias;

	@ManyToOne(optional = false)
	@JoinColumn(name = "escuela_id", nullable = false)
	@Setter
	private Escuela escuela;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Integer cupof;

	/* ===============================
	   Constructores
	   =============================== */

	protected Designacion() {
		this.franjasHorarias = new HashSet<>();
		this.asignaciones = new HashSet<>();
	}

	protected Designacion(Escuela escuela, Integer cupof) {
		if (escuela == null) {
			throw new IllegalArgumentException("La designación debe pertenecer a una escuela");
		}
		if (cupof == null) {
			throw new IllegalArgumentException("El cupof es obligatorio");
		}
		this.escuela = escuela;
		this.cupof = cupof;
		this.asignaciones = new HashSet<>();
		this.franjasHorarias = new HashSet<>();
	}

	/* ===============================
	   Comportamiento de dominio
	   =============================== */

	public void cubrirConSuplente(
			EmpleadoEducativo empleadoEducativo,
			LocalDate fechaDesde,
			LocalDate fechaHasta
	) {
		Asignacion a = new AsignacionNormal(
				this,
				empleadoEducativo,
				fechaDesde,
				fechaHasta,
				SituacionDeRevista.SUPLENTE
		);

		this.asignaciones.add(a);
	}

	public void agregarAsignacion(Asignacion asignacion) {
		if (asignacion == null) {
			throw new IllegalArgumentException("La asignación es obligatoria");
		}
		asignacion.setDesignacion(this);
		asignaciones.add(asignacion);
	}

	public void agregarFranjaHoraria(FranjaHoraria franja) {
		if (franja == null) {
			throw new IllegalArgumentException("La franja es obligatoria");
		}
		franja.setDesignacion(this);
		franjasHorarias.add(franja);
	}

	public boolean estaCubiertaEn(LocalDate fecha) {
		if (fecha == null) {
			return false;
		}

		return asignacionQueEjerceEn(fecha).isPresent();
	}

	public Optional<Asignacion> asignacionQueEjerceEn(LocalDate fecha) {
		if (fecha == null) {
			return Optional.empty();
		}

		List<Asignacion> candidatas = asignaciones.stream()
				.filter(a -> a.estaDisponibleEn(fecha))
				.filter(a -> !a.getEmpleadoEducativo().estaEnLicenciaEn(fecha))
				.toList();

		if (candidatas.isEmpty()) {
			return Optional.empty();
		}

		if (candidatas.size() > 1) {
			throw new IllegalStateException(
					"Más de una asignación ejerciendo el cargo para la misma fecha"
			);
		}

		return Optional.of(candidatas.get(0));
	}

	/**
	 * Hay al menos una asignación disponible,
	 * independientemente de licencias.
	 */
	public boolean tieneAsignacionActivaEn(LocalDate fecha) {
		if (fecha == null) {
			return false;
		}

		return asignaciones.stream()
				.anyMatch(a -> a.estaDisponibleEn(fecha));
	}


}

