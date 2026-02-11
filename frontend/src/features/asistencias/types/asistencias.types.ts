import type { RolEducativo } from "@/features/designaciones/types/designacion.types";
import type { LicenciaResumenDTO } from "@/features/licencias/types/licencia.types";

export type EstadoAsistencia = "PRESENTE" | "AUSENTE";

export type OrigenAsistencia = "MANUAL" | "LICENCIA";

export interface AsistenciaDiaDTO {
	id: number | null;
	fecha: string;
	estadoAsistencia: EstadoAsistencia;
	origenAsistencia: OrigenAsistencia | null;
	tipoLicencia: string | null;
	licencia: LicenciaResumenDTO | null;
}

export type EmpleadoAsistenciaItem = {
	id: number;
	cuil: string;
	apellido: string;
	nombre: string;
	roles: RolEducativo[];
};

export type FiltrosAsistencias = {
	rolesSeleccionados: RolEducativo[];
	busqueda: string;
};

export type RolCountDTO = {
	id: RolEducativo;
	label: string;
	count: number;
};

export type EmpleadoAsistenciaDTO = {
	id: number;
	cuil: string;
	nombre: string;
	apellido: string;
	roles: string[];
};

export type RegistrarInasistenciasManualDTO = {
	empleadoId: number;
	fechas: string[];
	tipoLicencia: string;
	observacion?: string;
};

export type EliminarInasistenciasManualDTO = {
	empleadoId: number;
	fechas: string[];
};
