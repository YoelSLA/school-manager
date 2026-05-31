import type z from "zod";
import type { crearEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/crearEmpleadoEducativo.schema";
import type { darBajaEmpleadoEducativo } from "@/features/empleadosEducativos/form/schemas/darBajaEmpleadoEducativo.schema";
import type { editarEmpleadoEducativoSchema } from "@/features/empleadosEducativos/form/schemas/editarEmpleadoEducativo.schema";
import type { LicenciaDetalleDTO, LicenciaEmpleadoEducativoRowDTO } from ".";
import type {
	AsignacionEmpleadoEducativoRowDTO,
	CargoDesignacionDTO,
} from "./asignaciones.types";
import type { PeriodoAbiertoDTO, PeriodoCerradoDTO } from "./common.types";
import type {
	EstadoAsignacion,
	EstadoLicencia,
	RolEducativo,
	SituacionDeRevista,
} from "./enums";

export type EmpleadoEducativoCreateDTO = z.infer<
	typeof crearEmpleadoEducativoSchema
>;

export type EmpleadoEducativoUpdateDTO = z.infer<
	typeof editarEmpleadoEducativoSchema
>;

export type BajaDefinitivaDTO = z.infer<typeof darBajaEmpleadoEducativo>;

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
	asignaciones: EmpleadoEducativoAsignacionItemDTO[];
	licencias: EmpleadoEducativoLicenciaItemDTO[];
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

export type EmpleadoEducativoLicenciaItemDTO = {
	id: number;
	normativa: {
		codigo: string;
		articulo: string;
		descripcion: string;
	};
	periodo: PeriodoCerradoDTO;
	estadoLicencia: EstadoLicencia;
};

export type EmpleadoFormValues = {
	cuil: string; // read-only en UI pero viaja en el objeto
	nombre: string;
	apellido: string;
	fechaNacimiento: string; // ISO yyyy-MM-dd
	telefono?: string;
	email: string;
	domicilio?: string;
	fechaIngreso?: string; // ISO yyyy-MM-dd
};

export interface EmpleadoEducativoAsignacionesDTO {
	empleado: EmpleadoEducativoBasicoDTO;
	asignaciones: AsignacionEmpleadoEducativoRowDTO[];
	total: number;
	tieneAsignacionActiva: boolean;
}

export interface EmpleadoEducativoBasicoDTO {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
	activo: boolean;
}

export interface EmpleadoEducativoLicenciasDTO {
	empleado: EmpleadoEducativoBasicoDTO;
	licenciaActiva: LicenciaDetalleDTO | null;
	historial: LicenciaEmpleadoEducativoRowDTO[];
	totalHistorial: number;
}
