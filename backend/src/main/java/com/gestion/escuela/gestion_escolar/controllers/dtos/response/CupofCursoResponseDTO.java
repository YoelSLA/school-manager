package com.gestion.escuela.gestion_escolar.controllers.dtos.response;

import com.gestion.escuela.gestion_escolar.controllers.dtos.EmpleadoEducativoBasicoResponseDTO;
import com.gestion.escuela.gestion_escolar.mappers.FranjaHorariaMapper;
import com.gestion.escuela.gestion_escolar.models.cupof.CupofCurso;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.SituacionDeRevista;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CupofCursoResponseDTO {

	private Long numeroCupof;
	private String orientacion;
	private SituacionDeRevista situacion;
	private RolEducativo rolEducativo;
	private EmpleadoEducativoBasicoResponseDTO empleadoEducativo;
	private CursoResponseDTO curso;
	private MateriaResponseDTO materia;
	private List<FranjaHorariaResponseDTO> horarios;
	private Long escuelaId;
	private String nombreEscuela;

}
