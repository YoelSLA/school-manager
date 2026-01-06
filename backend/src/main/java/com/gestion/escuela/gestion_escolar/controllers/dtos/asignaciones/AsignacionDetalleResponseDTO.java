package com.gestion.escuela.gestion_escolar.controllers.dtos.asignaciones;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.EmpleadoEducativoMinimoDTO;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class AsignacionDetalleResponseDTO {

	private Long id;
	private LocalDate fechaTomaPosesion;
	private LocalDate fechaCese;
	private SituacionDeRevista situacionDeRevista;
	private EmpleadoEducativoMinimoDTO empleado;
	private boolean vigente;
	private boolean enLicencia;
	private boolean cubierta;

}

