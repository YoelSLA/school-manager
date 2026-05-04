package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.periodo.PeriodoAbiertoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.periodo.PeriodoYaCerradoException;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/**
 * Representa un período de tiempo inclusivo en ambos extremos.
 */
@EqualsAndHashCode
@Embeddable
@Getter
public class Periodo {

	private LocalDate fechaDesde;
	private LocalDate fechaHasta;

	protected Periodo() {
	}

	public Periodo(LocalDate fechaDesde, LocalDate fechaHasta) {

		validarCrearPeriodo(fechaDesde, fechaHasta);

		this.fechaDesde = fechaDesde;
		this.fechaHasta = fechaHasta;

	}

	public boolean seSuperponeCon(Periodo otro) {
		if (otro == null) {
			return false;
		}

		LocalDate finThis = this.fechaHasta != null ? this.fechaHasta : LocalDate.MAX;
		LocalDate finOtro = otro.fechaHasta != null ? otro.fechaHasta : LocalDate.MAX;

		return !this.fechaDesde.isAfter(finOtro) && !otro.fechaDesde.isAfter(finThis);
	}

	public boolean esAbierto() {
		return fechaHasta == null;
	}

	public boolean esCerrado() {
		return fechaHasta != null;
	}

	public boolean estaVigenteEn(LocalDate fecha) {
		return contiene(fecha);
	}

	public int dias() {

		if (fechaHasta == null) {
			throw new PeriodoAbiertoException();
		}

		long dias = ChronoUnit.DAYS.between(fechaDesde, fechaHasta) + 1;

		return (int) dias;
	}

	public Periodo cerrarEn(LocalDate fechaCierre) {
		if (fechaCierre == null) {
			throw new CampoObligatorioException("fechaCierre");
		}

		if (this.esCerrado()) {
			throw new PeriodoYaCerradoException();
		}

		if (fechaCierre.isBefore(fechaDesde)) {
			throw new RangoFechasInvalidoException(fechaDesde, fechaCierre);
		}

		return new Periodo(this.fechaDesde, fechaCierre);
	}

	@Override
	public String toString() {
		return fechaDesde + " → " + (esAbierto() ? "abierto" : fechaHasta);
	}

	private void validarCrearPeriodo(LocalDate fechaDesde, LocalDate fechaHasta) {

		Validaciones.noNulo(fechaDesde, "fechaDesde");

		if (fechaHasta != null && fechaDesde.isAfter(fechaHasta)) {
			throw new RangoFechasInvalidoException(fechaDesde, fechaHasta);
		}

	}

	private boolean contiene(LocalDate fecha) {
		if (fecha == null) {
			return false;
		}

		boolean despuesDelInicio = !fecha.isBefore(fechaDesde);
		boolean antesDelFin = fechaHasta == null || !fecha.isAfter(fechaHasta);

		return despuesDelInicio && antesDelFin;
	}
}