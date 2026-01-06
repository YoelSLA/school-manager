package com.gestion.escuela.gestion_escolar.controllers.dtos.horarios;

import com.gestion.escuela.gestion_escolar.models.enums.DiaDeSemana;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
public class FranjaHorariaResponseDTO {

	private DiaDeSemana dia;
	private LocalTime horaDesde;
	private LocalTime horaHasta;

}

