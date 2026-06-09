import type z from "zod";
import type { crearEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/crearEmpleadoEducativo.schema";
import type { editarEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/editarEmpleadoEducativo.schema";
import type { LicenciaDetalleDTO, LicenciaEmpleadoEducativoRowDTO } from ".";
import type {
	AsignacionEmpleadoEducativoRowDTO,
	CargoDesignacionDTO,
} from "./asignaciones.types";
import type { PeriodoAbiertoDTO } from "./common.types";
import type {
	EstadoAsignacion,
	RolEducativo,
	SituacionDeRevista,
} from "./enums";

// REQUEST
export type EmpleadoEducativoCreateDTO = z.infer<
	typeof crearEmpleadoEducativoSchema
>;

export type EmpleadoEducativoUpdateDTO = z.infer<
	typeof editarEmpleadoEducativoSchema
>;

// RESPONSE
export interface EmpleadoEducativoAsignacionesDTO {
	empleadoEducativo: EmpleadoEducativoBasicoDTO;
	asignaciones: AsignacionEmpleadoEducativoRowDTO[];
	total: number;
	activas: number;
	finalizadas: number;
	tieneAsignacionesActivas: boolean;
}

export interface EmpleadoEducativoBasicoDTO {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
	activo: boolean;
}

export interface EmpleadoEducativoConRolesDTO {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
	rolesVigentes: RolEducativo[];
}

export interface EmpleadoEducativoDetalleDTO {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
	domicilio: string;
	telefono: string;
	email: string;
	fechaDeNacimiento: string;
	fechaDeIngreso: string;
	activo: boolean;
	rolesVigentes: RolEducativo[];
}

export interface EmpleadoEducativoLicenciasDTO {
	empleado: EmpleadoEducativoBasicoDTO;
	licenciaActiva: LicenciaDetalleDTO | null;
	historial: LicenciaEmpleadoEducativoRowDTO[];
	totalHistorial: number;
}

export interface EmpleadoEducativoResumenDTO {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
	fechaDeIngreso: string;
	activo: boolean;
	rolesVigentes: RolEducativo[];
}

export type EmpleadoEducativoAsignacionItemDTO = {
	id: number;
	periodo: PeriodoAbiertoDTO;
	situacionDeRevista: SituacionDeRevista;
	fechaBaja: string;
	causaBaja: string;
	estadoAsignacion: EstadoAsignacion;
	cupof: number;
	designacion: CargoDesignacionDTO;
};
