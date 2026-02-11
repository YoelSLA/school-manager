package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.OrigenAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"empleado_id", "escuela_id", "fecha"})
		}
)
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Asistencia {

	@Id
	@GeneratedValue
	@EqualsAndHashCode.Include
	@ToString.Include
	private Long id;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	private EmpleadoEducativo empleadoEducativo;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "escuela_id", nullable = false)
	private Escuela escuela;

	@Column(nullable = false)
	private LocalDate fecha;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private EstadoAsistencia estadoAsistencia;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private OrigenAsistencia origenAsistencia;

	@Enumerated(EnumType.STRING)
	private TipoLicencia tipoLicencia;

	@ManyToOne(fetch = FetchType.LAZY)
	private Licencia licencia;

	private String observacion;

	protected Asistencia() {
		// JPA
	}

	public Asistencia(
			EmpleadoEducativo empleadoEducativo,
			LocalDate fecha,
			OrigenAsistencia origenAsistencia,
			TipoLicencia tipoLicencia,
			Licencia licencia,
			String observacion
	) {
		this.escuela = empleadoEducativo.getEscuela();
		this.empleadoEducativo = Objects.requireNonNull(empleadoEducativo);
		this.fecha = Objects.requireNonNull(fecha);
		this.estadoAsistencia = EstadoAsistencia.AUSENTE;
		this.origenAsistencia = Objects.requireNonNull(origenAsistencia);
		this.tipoLicencia = tipoLicencia;
		this.licencia = licencia;
		this.observacion = observacion;

		validarInvariantes();
	}

	private void validarInvariantes() {

		if (origenAsistencia == OrigenAsistencia.MANUAL && licencia != null) {
			throw new IllegalStateException("Asistencia MANUAL no puede tener una licencia prologonda asociada");
		}

		if (origenAsistencia == OrigenAsistencia.LICENCIA && licencia == null) {
			throw new IllegalStateException("Asistencia con origen LICENCIA debe tener licencia prolongada asociada");
		}
	}

	public boolean esManual() {
		return origenAsistencia == OrigenAsistencia.MANUAL;
	}

	public boolean esPorLicencia() {
		return origenAsistencia == OrigenAsistencia.LICENCIA;
	}

	public boolean esJustificada() {
		return esPorLicencia() || tipoLicencia != null;
	}

	public boolean esInjustificada() {
		return esManual() && tipoLicencia == null;
	}

	public void aplicarLicencia(Licencia licencia) {
		this.origenAsistencia = OrigenAsistencia.LICENCIA;
		this.licencia = Objects.requireNonNull(licencia);
		this.tipoLicencia = null;
		this.observacion = null;

		validarInvariantes();
	}

	@Override
	public String toString() {
		return "Asistencia{" +
				"id=" + id +
				", fecha=" + fecha +
				", estado=" + estadoAsistencia +
				", origen=" + origenAsistencia +
				", empleadoId=" + (empleadoEducativo != null ? empleadoEducativo.getId() : null) +
				", licenciaId=" + (licencia != null ? licencia.getId() : null) +
				", tipoLicencia=" + tipoLicencia +
				", observacion='" + observacion + '\'' +
				'}';
	}

	public void actualizarManual(TipoLicencia tipoLicencia, String observacion) {
		if (this.origenAsistencia != OrigenAsistencia.MANUAL) {
			throw new IllegalStateException(
					"Solo se pueden editar la asistencia manual"
			);
		}

		this.tipoLicencia = tipoLicencia;
		this.observacion = observacion;
	}


}
