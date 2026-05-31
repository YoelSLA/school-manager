package com.gestion.escuela.gestion_escolar.controllers.mappers;

import com.gestion.escuela.gestion_escolar.controllers.dtos.asignacion.response.AsignacionEmpleadoEducativoRowDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.request.EmpleadoEducativoCreateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.request.EmpleadoEducativoUpdateDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.empleadoEducativo.response.*;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaDetalleDTO;
import com.gestion.escuela.gestion_escolar.controllers.dtos.licencia.response.LicenciaEmpleadoEducativoRowDTO;
import com.gestion.escuela.gestion_escolar.models.EmpleadoEducativo;
import com.gestion.escuela.gestion_escolar.models.Escuela;
import com.gestion.escuela.gestion_escolar.models.enums.EstadoAsignacion;
import com.gestion.escuela.gestion_escolar.models.enums.RolEducativo;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EmpleadoEducativoMapper {

	private static final LocalDate HOY = LocalDate.now();

	public static EmpleadoEducativoBasicoDTO toBasico(EmpleadoEducativo e) {
		return new EmpleadoEducativoBasicoDTO(
				e.getId(),
				e.getCuil(),
				e.getNombre(),
				e.getApellido(),
				e.isActivo()
		);
	}

	public static EmpleadoEducativoConRolesDTO toMinimoConRoles(
			EmpleadoEducativo e,
			Set<RolEducativo> roles
	) {
		return new EmpleadoEducativoConRolesDTO(
				e.getId(),
				e.getCuil(),
				e.getNombre(),
				e.getApellido(),
				roles
		);
	}

	public static EmpleadoEducativoResumenDTO toResumen(
			EmpleadoEducativo e,
			Set<RolEducativo> rolesEducativos
	) {
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

	public static EmpleadoEducativoDetalleDTO toDetalle(
			EmpleadoEducativo e,
			Set<RolEducativo> rolesEducativos
	) {
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
				rolesEducativos
		);
	}

	public static EmpleadoEducativoAsignacionesDTO toAsignaciones(
			EmpleadoEducativo e
	) {

		List<AsignacionEmpleadoEducativoRowDTO> items =
				e.getAsignaciones().stream()
						.map(AsignacionMapper::toAsignacionRow)
						.toList();

		int total = items.size();
		int activas = (int) e.getAsignaciones().stream()
				.filter(a -> a.getEstadoEn(HOY) == EstadoAsignacion.ACTIVA)
				.count();
		int finalizadas = total - activas;

		return new EmpleadoEducativoAsignacionesDTO(
				toBasico(e),
				items,
				total,
				activas,
				finalizadas,
				activas > 0
		);
	}

	public static EmpleadoEducativoLicenciasDTO toLicencias(
			EmpleadoEducativo e
	) {
		LicenciaDetalleDTO licenciaActiva = e.licenciaActivaEn(HOY)
				.map(LicenciaMapper::toDetalle)
				.orElse(null);

		List<LicenciaEmpleadoEducativoRowDTO> historial = e.getLicencias()
				.stream()
				.filter(l -> !l.estaVigenteEn(HOY))
				.map(LicenciaMapper::toLicenciaRow)
				.toList();

		return new EmpleadoEducativoLicenciasDTO(
				toBasico(e),
				licenciaActiva,
				historial,
				historial.size()
		);
	}

	public static EmpleadoEducativo toEntity(
			EmpleadoEducativoCreateDTO d,
			Escuela e
	) {
		return EmpleadoEducativo.builder()
				.escuela(e)
				.cuil(d.cuil())
				.nombre(d.nombre())
				.apellido(d.apellido())
				.telefono(d.telefono())
				.domicilio(d.domicilio())
				.email(d.email())
				.fechaDeNacimiento(d.fechaDeNacimiento())
				.fechaDeIngreso(d.fechaDeIngreso())
				.build();
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


}