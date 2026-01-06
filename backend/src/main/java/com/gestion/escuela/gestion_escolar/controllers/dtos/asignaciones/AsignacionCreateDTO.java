package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones;

import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import com.gestion.escuela.gestion_escolar.models.enums.TipoAsignacion;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class AsignacionCreateDTO {

	@NotNull
	private Long empleadoId;

	@NotNull
	private SituacionDeRevista situacionDeRevista;

	@NotNull
	private TipoAsignacion tipoAsignacion;

	@NotNull
	private LocalDate fechaTomaPosesion;

	@NotNull
	private LocalDate fechaCese;
}
