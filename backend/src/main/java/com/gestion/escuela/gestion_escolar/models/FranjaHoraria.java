package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import com.gestion.escuela.gestion_escolar.models.exceptions.Validaciones;
import com.gestion.escuela.gestion_escolar.models.exceptions.franjaHoraria.RangoHorarioInvalidoException;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.time.Duration;
import java.time.LocalTime;

@Embeddable
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
public class FranjaHoraria {

	@EqualsAndHashCode.Include
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private DiaDeSemana dia;

	@EqualsAndHashCode.Include
	@Column(name = "hora_desde", nullable = false)
	private LocalTime horaDesde;

	@EqualsAndHashCode.Include
	@Column(name = "hora_hasta", nullable = false)
	private LocalTime horaHasta;

	protected FranjaHoraria() {
		// requerido por JPA
	}

	public FranjaHoraria(DiaDeSemana dia, LocalTime horaDesde, LocalTime horaHasta) {
		validarCrearFranjaHoraria(dia, horaDesde, horaHasta);
		this.dia = dia;
		this.horaDesde = horaDesde;
		this.horaHasta = horaHasta;
	}

	public boolean seSuperponeCon(FranjaHoraria otra) {
		Validaciones.noNulo(otra, "franja horaria");

		if (!esMismoDiaQue(otra))
			return false;

		return this.horaDesde.isBefore(otra.horaHasta) && otra.horaDesde.isBefore(this.horaHasta);
	}

	public boolean esMismoDiaQue(FranjaHoraria otra) {
		Validaciones.noNulo(otra, "franja horaria");
		return this.dia.equals(otra.dia);
	}

	public boolean contiene(LocalTime hora) {
		Validaciones.noNulo(hora, "hora");

		return !hora.isBefore(horaDesde) && hora.isBefore(horaHasta);
	}

	public Duration duracion() {
		return Duration.between(horaDesde, horaHasta);
	}

	@Override
	public String toString() {
		return String.format(
				"%s %s → %s",
				dia,
				horaDesde,
				horaHasta
		);
	}

	private void validarCrearFranjaHoraria(
			DiaDeSemana dia,
			LocalTime horaDesde,
			LocalTime horaHasta
	) {
		Validaciones.noNulo(dia, "dia");
		Validaciones.noNulo(horaDesde, "horaDesde");
		Validaciones.noNulo(horaHasta, "horaHasta");

		if (!horaDesde.isBefore(horaHasta)) {
			throw new RangoHorarioInvalidoException(horaDesde, horaHasta);
		}
	}
}