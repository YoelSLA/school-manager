package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.periodo.PeriodoAbiertoException;
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

	public boolean finalizaEn(LocalDate fecha) {
		return fechaHasta != null && fechaHasta.equals(fecha);
	}

	public boolean comienzaEn(LocalDate fecha) {
		return fechaDesde.equals(fecha);
	}

	public int dias() {

		if (fechaHasta == null) {
			throw new PeriodoAbiertoException();
		}

		long dias = ChronoUnit.DAYS.between(fechaDesde, fechaHasta) + 1;

		return (int) dias;
	}

	public int diasHasta(LocalDate fecha) {
		if (!contiene(fecha)) {
			throw new IllegalArgumentException("La fecha no pertenece al período");
		}

		return (int) ChronoUnit.DAYS.between(fechaDesde, fecha) + 1;
	}

	public Periodo cerrarEn(LocalDate fechaCierre) {
		if (fechaCierre == null) {
			throw new IllegalArgumentException("fechaCierre no puede ser null");
		}

		if (fechaCierre.isBefore(fechaDesde)) {
			throw new RangoFechasInvalidoException(fechaDesde, fechaCierre);
		}

		return new Periodo(this.fechaDesde, fechaCierre);
	}

	public Periodo intersectarCon(Periodo otro) {
		if (!seSuperponeCon(otro)) {
			return null;
		}

		LocalDate nuevoDesde = fechaDesde.isAfter(otro.fechaDesde)
				? fechaDesde
				: otro.fechaDesde;

		LocalDate finThis = fechaHasta != null ? fechaHasta : LocalDate.MAX;
		LocalDate finOtro = otro.fechaHasta != null ? otro.fechaHasta : LocalDate.MAX;

		LocalDate nuevoHasta = finThis.isBefore(finOtro) ? finThis : finOtro;

		return nuevoHasta.equals(LocalDate.MAX)
				? new Periodo(nuevoDesde, null)
				: new Periodo(nuevoDesde, nuevoHasta);
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