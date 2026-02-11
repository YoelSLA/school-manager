package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.exceptions.CampoObligatorioException;
import com.gestion.escuela.gestion_escolar.models.exceptions.RangoFechasInvalidoException;
import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Embeddable
@Getter
public class Periodo {

	private LocalDate fechaDesde, fechaHasta;

	protected Periodo() {
	}

	public Periodo(LocalDate fechaDesde, LocalDate fechaHasta) {
		if (fechaDesde == null) {
			throw new CampoObligatorioException("fecha");
		}
		if (fechaHasta != null && fechaDesde.isAfter(fechaHasta)) {
			throw new RangoFechasInvalidoException("La fecha desde no puede ser posterior a la fecha hasta");
		}
		this.fechaDesde = fechaDesde;
		this.fechaHasta = fechaHasta;
	}

	public boolean contiene(LocalDate fecha) {
		if (fecha == null)
			return false;

		boolean despuesDelInicio = !fecha.isBefore(fechaDesde);
		boolean antesDelFin = fechaHasta == null || !fecha.isAfter(fechaHasta);

		return despuesDelInicio && antesDelFin;
	}

	public boolean seSuperponeCon(Periodo otro) {
		if (otro == null)
			return false;

		LocalDate finThis = this.fechaHasta != null ? this.fechaHasta : LocalDate.MAX;
		LocalDate finOtro = otro.fechaHasta != null ? otro.fechaHasta : LocalDate.MAX;

		return !this.fechaDesde.isAfter(finOtro)
				&& !otro.fechaDesde.isAfter(finThis);
	}

	public boolean esAbierto() {
		return fechaHasta == null;
	}

	public Integer dias() {
		if (fechaHasta == null) {
			throw new IllegalStateException("No se puede calcular días de un período abierto");
		}
		return (int) ChronoUnit.DAYS.between(fechaDesde, fechaHasta) + 1;
	}

}

