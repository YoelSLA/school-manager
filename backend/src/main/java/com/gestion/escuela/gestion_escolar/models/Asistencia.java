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
				@UniqueConstraint(columnNames = {
						"empleado_educativo_id",
						"escuela_id",
						"fecha"
				})
		}
)
@Getter
public class Asistencia extends AuditableEntity {

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

		if (estadoAsistencia != EstadoAsistencia.AUSENTE) {
			throw new IllegalStateException(
					"Solo se persisten asistencia AUSENTE"
			);
		}

		this.escuela = empleadoEducativo.getEscuela();
		this.empleadoEducativo = empleadoEducativo;
		this.fecha = fecha;
		this.estadoAsistencia = estadoAsistencia;
		this.tipoLicencia = tipoLicencia;
		this.observacion = observacion;
	}
	
	public void actualizarManual(
			TipoLicencia tipoLicencia,
			String observacion
	) {

		if (this.estadoAsistencia != EstadoAsistencia.AUSENTE) {
			throw new IllegalStateException(
					"Solo se puede actualizar una asistencia AUSENTE"
			);
		}

		this.tipoLicencia = tipoLicencia;
		this.observacion = observacion;
	}

}