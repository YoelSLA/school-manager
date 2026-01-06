package com.gestion.escuela.gestion_escolar.controllers.dtos.horarios;

import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalTime;

@Getter
public class FranjaHorariaCreateDTO {

	@NotNull
	private DiaDeSemana dia;

	@NotNull
	private LocalTime horaDesde;

	@NotNull
	private LocalTime horaHasta;
}
