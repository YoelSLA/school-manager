package com.gestion.escuela.gestion_escolar.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadosEducativos.*;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencias.LicenciaNormativaDTO;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.Licencia;
import com.gestion.escuela.gestion_escolar.models.asignacion.Asignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import com.gestion.escuela.gestion_escolar.models.enums.TipoLicencia;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public class EmpleadoEducativoMapper {

	private final static LocalDate HOY = LocalDate.now();

	public static EmpleadoEducativoMinimoDTO toMinimo(EmpleadoEducativo e) {
		return new EmpleadoEducativoMinimoDTO(
				e.getId(),
				e.getCuil(),
				e.getNombre(),
				e.getApellido()
		);
	}

	public static EmpleadoEducativoResumenDTO toResumen(EmpleadoEducativo e, Set<RolEducativo> rolesEducativos) {
		return new EmpleadoEducativoResumenDTO(
				e.getId(),
				e.getCuil(),
				e.getNombre(),
				e.getApellido(),
				e.getFechaDeIngreso(),
				e.isActivo(),
				rolesEducativos
		);
	}

	public static EmpleadoEducativoDetalleDTO toDetalle(EmpleadoEducativo e, Set<RolEducativo> rolesEducativos) {

		List<EmpleadoEducativoAsignacionItemDTO> asignaciones =
				e.getAsignaciones().stream()
						.map(EmpleadoEducativoMapper::toAsignacionItem)
						.toList();

		List<EmpleadoEducativoLicenciaItemDTO> licencias =
				e.getLicencias().stream()
						.map(EmpleadoEducativoMapper::toLicenciaItem)
						.toList();

		return new EmpleadoEducativoDetalleDTO(
				e.getId(),
				e.getCuil(),
				e.getNombre(),
				e.getApellido(),
				e.getDomicilio(),
				e.getTelefono(),
				e.getEmail(),
				e.getFechaDeNacimiento(),
				e.getFechaDeIngreso(),
				e.isActivo(),
				asignaciones,
				licencias,
				rolesEducativos
		);
	}

	public static EmpleadoEducativo toEntity(EmpleadoEducativoCreateDTO d, Escuela e) {
		return new EmpleadoEducativo(
				e,
				d.cuil(),
				d.nombre(),
				d.apellido(),
				d.domicilio(),
				d.telefono(),
				d.fechaDeNacimiento(),
				d.fechaDeIngreso(),
				d.email()
		);
	}

	public static void actualizarEntidad(
			EmpleadoEducativo empleado,
			EmpleadoEducativoUpdateDTO dto
	) {
		empleado.actualizar(
				dto.cuil(),
				dto.nombre(),
				dto.apellido(),
				dto.domicilio(),
				dto.telefono(),
				dto.fechaDeNacimiento(),
				dto.fechaDeIngreso(),
				dto.email()
		);
	}


	private static EmpleadoEducativoLicenciaItemDTO toLicenciaItem(Licencia l) {
		TipoLicencia tipo = l.getTipoLicencia();

		return new EmpleadoEducativoLicenciaItemDTO(
				l.getId(),
				new LicenciaNormativaDTO(
						tipo.getCodigo(),
						tipo.getArticulo(),
						tipo.getDescripcion()
				),
				PeriodoMapper.toPeriodoResponse(l),
				l.getEstadoEn(HOY)
		);
	}

	private static EmpleadoEducativoAsignacionItemDTO toAsignacionItem(Asignacion a) {
		return new EmpleadoEducativoAsignacionItemDTO(
				a.getId(),
				PeriodoMapper.toPeriodoResponse(a),
				a.getSituacionDeRevista(),
				a.getFechaBaja(),
				a.getCausaBaja(),
				a.getEstadoEn(HOY),
				a.getDesignacion().getCupof(),
				a.getDesignacion().getClass().getSimpleName()
		);
	}

}

