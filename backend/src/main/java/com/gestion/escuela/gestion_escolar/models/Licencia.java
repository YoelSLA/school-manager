package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;
import com.gestion.escuela.gestion_escolar.models.exceptions.EmpleadoEducativoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.FechasLicenciaObligatoriasException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasLicenciaInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.TipoLicenciaObligatorioException;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "licencia")
@Getter
public class Licencia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "empleado_id")
	private EmpleadoEducativo empleado;

	@ManyToOne(optional = false)
	@JoinColumn(name = "escuela_id")
	private Escuela escuela;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TipoLicencia tipoLicencia;

	@Column(nullable = false)
	private LocalDate fechaDesde;

	@Column(nullable = false)
	private LocalDate fechaHasta;

	@Column(length = 500)
	private String descripcion;

	protected Licencia() {
	}

	public Licencia(
			Escuela escuela,
			EmpleadoEducativo empleado,
			TipoLicencia tipoLicencia,
			LocalDate fechaDesde,
			LocalDate fechaHasta,
			String descripcion
	) {
		validarEmpleado(empleado);
		validarTipoLicencia(tipoLicencia);
		validarRangoDeFechas(fechaDesde, fechaHasta);

		this.escuela = escuela;
		this.empleado = empleado;
		this.tipoLicencia = tipoLicencia;
		this.fechaDesde = fechaDesde;
		this.fechaHasta = fechaHasta;
		this.descripcion = descripcion;
	}

	/* ==========================
	   COMPORTAMIENTO
	   ========================== */

	public boolean aplicaEn(LocalDate fecha) {
		return !fecha.isBefore(fechaDesde) && !fecha.isAfter(fechaHasta);
	}

	public long dias() {
		return ChronoUnit.DAYS.between(fechaDesde, fechaHasta) + 1;
	}

	public boolean seSuperponeCon(LocalDate desde, LocalDate hasta) {
		return !this.fechaDesde.isAfter(hasta) && !desde.isAfter(this.fechaHasta);
	}

	/* ==========================
	   VALIDACIONES
	   ========================== */

	private void validarEmpleado(EmpleadoEducativo empleado) {
		if (empleado == null) {
			throw new EmpleadoEducativoObligatorioException();
		}
	}

	private void validarTipoLicencia(TipoLicencia tipoLicencia) {
		if (tipoLicencia == null) {
			throw new TipoLicenciaObligatorioException();
		}
	}

	private void validarRangoDeFechas(LocalDate desde, LocalDate hasta) {
		if (desde == null || hasta == null) {
			throw new FechasLicenciaObligatoriasException();
		}
		if (desde.isAfter(hasta)) {
			throw new RangoFechasLicenciaInvalidoException();
		}
	}
}

