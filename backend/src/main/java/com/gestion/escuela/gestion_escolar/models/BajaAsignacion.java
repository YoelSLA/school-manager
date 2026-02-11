package com.gestion.escuela.gestion_escolar.models;

import com.gestion.escuela.gestion_escolar.models.enums.CausaBaja;
import com.gestion.escuela.gestion_escolar.models.exceptions.EstadoInvalidoException;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;

import java.time.LocalDate;

@Embeddable
@Getter
public class BajaAsignacion {

	private LocalDate fechaBaja;

	@Enumerated(EnumType.STRING)
	private CausaBaja causa;

	protected BajaAsignacion() {
	}

	public BajaAsignacion(LocalDate fechaBaja, CausaBaja causa) {
		if (fechaBaja == null || causa == null) {
			throw new EstadoInvalidoException(
					"No se puede dar de baja una asignación en este estado"
			);
		}
		this.fechaBaja = fechaBaja;
		this.causa = causa;
	}
}
