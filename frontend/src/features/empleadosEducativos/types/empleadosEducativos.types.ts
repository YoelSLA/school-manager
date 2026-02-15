import type {
	EstadoAsignacion,
	SituacionDeRevista,
} from "@/features/asignaciones/types/asignacion.types";
import type { RolEducativo } from "@/features/designaciones/types/designacion.types";
import type { EstadoLicencia } from "@/features/licencias/types/licencia.types";
import type { PeriodoAbiertoDTO, PeriodoCerradoDTO } from "@/utils/types";

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

export interface EmpleadoEducativoMinimoDTO {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
}

export type EmpleadoEducativoAsignacionItemDTO = {
	id: number;
	periodo: PeriodoAbiertoDTO;
	situacionDeRevista: SituacionDeRevista;
	fechaBaja: string;
	causaBaja: string;
	estadoAsignacion: EstadoAsignacion;
	cupof: number;
	tipoDesignacion: string;
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

export type EmpleadoEducativoFiltro = "TODOS" | "ACTIVOS" | "INACTIVOS";

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
