package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones;

import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class AsignacionResponseDTO {

	private Long id;
	private SituacionDeRevista situacionDeRevista;
	private String nombreEmpleado;
	private LocalDate fechaTomaPosesion;
	private LocalDate fechaCese;

}

