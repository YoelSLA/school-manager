package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDate;
import java.util.Objects;

@Embeddable
public class BajaAsignacion {

	private LocalDate fechaBaja;

	@Enumerated(EnumType.STRING)
	private CausaBaja motivo;

	protected BajaAsignacion() {
	}

	public BajaAsignacion(LocalDate fechaBaja, CausaBaja motivo) {
		this.fechaBaja = Objects.requireNonNull(fechaBaja);
		this.motivo = Objects.requireNonNull(motivo);
	}
}
