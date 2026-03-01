package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsistencia;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

@Entity
@Table(
		name = "asistencia",
		uniqueConstraints = {
				@UniqueConstraint(columnNames = {"empleado_educativo_id", "escuela_id", "fecha"})
		}
)
@Getter
public class Asistencia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	private TipoLicencia tipoLicencia;

	private String observacion;

	protected Asistencia() {
		// JPA
	}

	public Asistencia(
			EmpleadoEducativo empleadoEducativo,
			LocalDate fecha,
			EstadoAsistencia estadoAsistencia,
			TipoLicencia tipoLicencia,
			String observacion
	) {

		Validaciones.noNulo(empleadoEducativo, "empleado educativo");
		Validaciones.noNulo(fecha, "fecha");
		Validaciones.noNulo(estadoAsistencia, "estado asistencia");

		this.escuela = empleadoEducativo.getEscuela();
		this.empleadoEducativo = empleadoEducativo;
		this.fecha = fecha;
		this.estadoAsistencia = estadoAsistencia;
		this.tipoLicencia = tipoLicencia;
		this.observacion = observacion;

		validarInvariantes();
	}

	public boolean esJustificada() {
		return tipoLicencia != null;
	}

	public boolean esInjustificada() {
		return estadoAsistencia == EstadoAsistencia.AUSENTE
				&& tipoLicencia == null;
	}

	public void actualizarManual(
			TipoLicencia tipoLicencia,
			String observacion
	) {

		// 🔹 Solo tiene sentido si es AUSENTE
		if (this.estadoAsistencia != EstadoAsistencia.AUSENTE) {
			throw new IllegalStateException(
					"Solo se puede actualizar una asistencia AUSENTE"
			);
		}

		this.tipoLicencia = tipoLicencia;
		this.observacion = observacion;

		validarInvariantes();
	}

	private void validarInvariantes() {

		if (estadoAsistencia == EstadoAsistencia.PRESENTE && tipoLicencia != null) {
			throw new IllegalStateException(
					"Una asistencia PRESENTE no puede tener tipo de licencia"
			);
		}
	}
}
